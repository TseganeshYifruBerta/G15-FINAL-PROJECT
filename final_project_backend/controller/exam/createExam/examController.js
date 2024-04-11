const CreatExam = require('../../../models/exam/createExam'); // Adjust the path as necessary
const sequelize = require('../../../database/sequelize'); // Adjust the path as necessary
const SelectedQuestionForExam = require('../../../models/exam/SelectedQuestionForExam'); // Adjust the path as necessary
const SelectedSectionsForExam = require('../../../models/exam/SelectedSectionsForExam'); // Adjust the path as necessary
const User = require('../../../models/auth/user.model');



const updateCreatedExam = async (req, res) => {
  try {
    const { teacherId, examId } = req.params;
    const { title, date_and_time, instruction, duration, status, sections} = req.body;

    const exam = await CreatExam.findOne({
      where: {
        id: examId,
        teacherId: teacherId
      }
    });

    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    // Start a transaction
    const transaction = await sequelize.transaction();

    try {

      exam.title = title;
      exam.date_and_time = date_and_time;
      exam.instruction = instruction;
      exam.duration = duration;
      exam.status = status;
      await exam.save({ transaction });

      // update section
      if (sections && sections.length > 0) {
        await Promise.all(sections.map(async (section) => {
          await SelectedSectionsForExam.update(
            { sections: section.sections },
            { where: { examId: examId, id: section.id }, transaction }
          );
        }));
      }
      

      // Commit the transaction
      await transaction.commit();

      // Fetch updated data
      const updatedExam = await CreatExam.findByPk(examId);
      const updatedSections = await SelectedSectionsForExam.findAll({ where: { examId: examId } });
     

      return res.status(200).json({ updatedExam, updatedSections});
    } catch (error) {
      // Rollback the transaction if an error occurs
      await transaction.rollback();
      console.error(error);
      return res.status(500).json({ error: 'Failed to update exam' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};





// Delete an exam
const deleteCreatedExam = async (req, res) => {
  const { teacherId, examId } = req.params;

  try {
    const exam = await CreatExam.findOne({
      where: {
        id: examId,
        teacherId: teacherId
      }
    });
    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    const transaction = await sequelize.transaction();
    try {
      await SelectedSectionsForExam.destroy({ where: { examId: examId }, transaction });
      await SelectedQuestionForExam.destroy({ where: { examId: examId }, transaction });
      await CreatExam.destroy({ where: {id: examId }, transaction });
      await transaction.commit();
      return res.status(200).json({ message: 'Exam deleted successfully' });

    }
    catch (error) {
      await transaction.rollback();
      console.error(error);
      return res.status(500).json({ error: 'Failed to delete exam' });
    }
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: "internal server error" });
  }
}
const AddSectionToExam = async (req, res) => {
  const { sections, examId } = req.body;

  try {
    if(!sections || !examId) {
      return res.status(400).json({ error: 'Sections and examId are required' });
    }
    const exam = await CreatExam.findOne({ where: { id: examId } });
    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    const transaction = await sequelize.transaction();
    const sectionsArray = Array.isArray(sections) ? sections : [sections];
    let errors = [];
    let addedSections = [];

    for (let section of sectionsArray) {
      const existingSection = await SelectedSectionsForExam.findOne({
        where: { sections: section, examId: examId }
      });
      if (existingSection) {
        errors.push(`Section ${section} already added to exam`);
        continue; // Skip this iteration and go to the next section
      }
      const newSection = await SelectedSectionsForExam.create({
        sections: section,
        examId: examId,
      }, { transaction });
      addedSections.push(newSection);
    }

    if (errors.length > 0) {
      await transaction.rollback();
      return res.status(400).json({ errors });
    } else {
      await transaction.commit();
      return res.status(201).json({ message: 'Sections added to exam', addedSections });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const DeleteSectionToExam = async (req, res) => {
  const { examId, sectionId } = req.params;

  try {
    const section = await SelectedSectionsForExam.findOne({
      where: {
        id: sectionId,
        examId: examId
      }
    });

    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }

    try {
      await section.destroy();
      return res.status(200).json({ message: 'Section deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to delete section' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


// Function to start an exam
const startCreatedExam = async (req, res) => {
  const { id } = req.params; // Get exam ID from the request parameters

  try {
    const exam = await CreatExam.findByPk(id);
    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    // Update the exam status to "running"
    await exam.update({ status: 'running' });

    // Schedule to update the status to "ended" after the exam's duration
    const durationInMilliseconds = exam.duration * 60000; // Convert duration from minutes to milliseconds
    setTimeout(async () => {
      await exam.update({ status: 'end' });
    }, durationInMilliseconds);

    return res.status(200).json({ message: 'Exam started successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const endStartedExam = async (req, res) => {
  const { id } = req.params; // Get exam ID from the request parameters

  try {
    const exam = await CreatExam.findByPk(id);
    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    await exam.update({ status: 'end' });

    return res.status(200).json({ message: 'Exam ended successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};





module.exports = {

  deleteCreatedExam,
  updateCreatedExam,
  startCreatedExam,

  AddSectionToExam,
  DeleteSectionToExam,

  endStartedExam

}
