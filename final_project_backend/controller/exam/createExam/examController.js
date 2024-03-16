const { CreatExam } = require('../../../models/exam/createExam'); // Adjust the path as necessary

  // Create an exam
  const createExam = async (req, res) => {
    try {
      const { title, date_and_time, instruction, question_ids } = req.body;
      const exam = await CreatExam.create({

        title,
        date_and_time,
        instruction,
        question_ids,
        duration,
        status: 'upcoming',
        section
        , // Default is set in the model, so this is technically optional
      });
      return res.status(201).json(exam);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  // In your exam controller file


  // Update an exam
  const updateCreatedExam =  async (req, res) => {
    try {
      const { id } = req.params;
      const { title, date_and_time, instruction, question_ids, status } = req.body;
      const exam = await CreatExam.findByPk(id);
      if (exam) {
        exam.title = title || exam.title;
        exam.date_and_time = date_and_time || exam.date_and_time;
        exam.instruction = instruction || exam.instruction;
        exam.question_ids = question_ids || exam.question_ids;
        exam.status = status || exam.status;
        await exam.save();
        return res.status(200).json(exam);
      } else {
        return res.status(404).json({ error: 'Exam not found' });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Delete an exam
  const deleteCreatedExam = async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await CreatExam.destroy({ where: { id } });
      if (deleted) {
        return res.status(204).send();
      } else {
        return res.status(404).json({ error: 'Exam not found' });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
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
