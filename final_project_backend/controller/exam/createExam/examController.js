const { CreatExam } = require('../../../models/exam/createExam'); // Adjust the path as necessary
const { sequelize } = require('../../../models/exam/questions'); // Adjust the path as necessary
const { Question } = require('../../../models/exam/questions'); // Adjust the path as necessary
const { Section } = require('../../../models/exam/section'); // Adjust the path as necessary
  // Create an exam
  const createExam = async (req, res) => {
    try {
      const { title, date_and_time, instruction, question_ids } = req.body;
      const exam = await CreatExam.create({

        title,
        date_and_time,
        instruction,
        duration,
        status: 'upcoming',
        // Default is set in the model, so this is technically optional
      });
      return res.status(201).json(exam);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  // In your exam controller file


  // Update an exam
  const updateCreatedExam = async (req, res) => {
    try
    {
      const { id } = req.params;
      const { title, date_and_time, instruction, duration, status, sections, questions } = req.body;
      const exam = await CreatExam.findByPk(id);
      if (!exam) {
        return res.status(404).json({ message: 'Exam not found' });
      }
      const transaction = await sequelize.transaction();
      try{
        exam.title = title;
        exam.date_and_time = date_and_time;
        exam.instruction = instruction;
        exam.duration = duration;
        exam.status = status;
        await exam.save({ transaction });
        if (sections) {

          await Section.update(
            { section: sections },
            { where: { examId: id }, transaction }
          );
        }
        if (questions) {
          await Question.update(
            { question: questions },
            { where: { examId: id }, transaction }
          );
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
        return res.status(404).json({ error: 'Exam not found' });}

        const transaction = await sequelize.transaction();
        try {
          await Section.destroy({ where: { examId: id }, transaction });
          await Question.destroy({ where: { examId: id }, transaction });
          await CreatExam.destroy({ where: { id }, transaction });
          await transaction.commit();
          return res.status(200).json({ message: 'Exam deleted successfully' });
        
        }
        catch (error) {
          await transaction.rollback();
          console.error(error);
          return res.status(500).json({ error: 'Failed to delete exam' });
        }}
        catch (error) {
          console.error(error);
          return res.status(500).json({ error: "internal server error" });
        }
      }
// In your exam controller file

// Function to start an exam
const startcreatedExam = async (req, res) => {
  const { examId } = req.params; // Get exam ID from the request parameters
  
  try {
    const exam = await CreatExam.findByPk(examId);
    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }
    
    // Update the exam status to "running"
    await exam.update({ status: 'running' });
    
    // Schedule to update the status to "ended" after the exam's duration
    const durationInMilliseconds = exam.duration * 60000; // Convert duration from minutes to milliseconds
    setTimeout(async () => {
      await exam.update({ status: 'ended' });
    }, durationInMilliseconds);
    
    return res.status(200).json({ message: 'Exam started successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

  

module.exports = { 
  
deleteCreatedExam,
updateCreatedExam,
startcreatedExam,
createExam

}
