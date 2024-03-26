const CreatExam = require('../../../models/exam/createExam'); // Adjust the path as necessary
const sequelize = require('../../../database/sequelize'); // Adjust the path as necessary
const SelectedQuestionForExam = require('../../../models/exam/SelectedQuestionForExam'); // Adjust the path as necessary
const SelectedSectionsForExam = require('../../../models/exam/SelectedSectionsForExam'); // Adjust the path as necessary
const User = require('../../../models/auth/user.model');

const createExam = async (req, res) => {
  try {
    const { title, date_and_time, instruction, duration, sections, questions, teacherId } = req.body;

    const foundUser = await User.findOne({
      where: {
        id: teacherId
      }
    })
    if (!foundUser) {
      return res.status(400).json({ message: "The user is not found" })
    }
    if (foundUser.status === "active") {

      const exam = await CreatExam.create({
        title,
        date_and_time,
        instruction,
        duration,
        status: 'upcoming',
        teacherId
      });


      if (sections && sections.length > 0) {
        await Promise.all(sections.map(async (section) => {
          await SelectedSectionsForExam.create({
            sections: section,
            examId: exam.id,
          });
        }));
      }

      if (questions && questions.length > 0) {
        await Promise.all(questions.map(async (questionId) => {
          await SelectedQuestionForExam.create({
            question_ids: questionId,
            examId: exam.id,
          });
        }));
      }

      return res.status(201).json(exam);
    }
    else {
      return res.status(403).json({ message: "The user is not active" })
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

// In your exam controller file


// Update an exam
const updateCreatedExam = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, date_and_time, instruction, duration, status, section, questions, teacherId } = req.body;
    const exam = await CreatExam.findByPk(id);
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }
    const transaction = await sequelize.transaction();
    try {
      exam.title = title;
      exam.date_and_time = date_and_time;
      exam.instruction = instruction;
      exam.duration = duration;
      exam.teacherId = teacherId;
      exam.status = status;
      await exam.save({ transaction });
      // if (section) {

      //   await Section.update(
      //     { sections: section },
      //     { where: { examId: id }, transaction }
      //   );
      // }
      console.log("section")

      if (section && section.length > 0) {
        await Promise.all(section.map(async (section) => {
          await SelectedSectionsForExam.update(
            { sections: section.sections },
            { where: { examId: id, id: section.id }, transaction }
          );
        }));
      }
      if (questions && questions.length > 0) {

        await Promise.all(questions.map(async (questionId) => {
          console.log("questihhhhhon", questionId)

          await SelectedQuestionForExam.update(
            { question_ids: questionId.question_ids },
            { where: { examId: id, id: questionId.id }, transaction }
          );
          console.log("quesyyyn")

        }));
      }

      await transaction.commit();
      const updatedExam = await CreatExam.findByPk(id);
      const updatedSections = await Section.findAll({ where: { examId: id } });
      const updatedQuestions = await Question.findAll({ where: { examId: id } });
      return res.status(200).json({ updatedExam, updatedSections, updatedQuestions });
    }
    catch (error) {
      await transaction.rollback();
      console.error(error);
      return res.status(500).json({ error: 'Failed to update exam' });
    }
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }


}




// Delete an exam
const deleteCreatedExam = async (req, res) => {
  const { id } = req.params;

  try {
    const exam = await CreatExam.findByPk(id);
    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    const transaction = await sequelize.transaction();
    try {
      await SelectedSectionsForExam.destroy({ where: { examId: id }, transaction });
      await SelectedQuestionForExam.destroy({ where: { examId: id }, transaction });
      await CreatExam.destroy({ where: { id }, transaction });
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
// In your exam controller file

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



module.exports = {

  deleteCreatedExam,
  updateCreatedExam,
  startCreatedExam,
  createExam

}
