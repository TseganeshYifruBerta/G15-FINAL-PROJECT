const CreatExam = require('../path/to/your/model/CreatExam');

// Controller to get all exams
const getAllExams = async (req, res) => {
  try {
    const exams = await CreatExam.findAll();
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Controller to get an exam by ID
const getExamById = async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from the request parameters
    const exam = await CreatExam.findByPk(id);

    if (exam) {
      res.status(200).json(exam);
    } else {
      res.status(404).send('Exam not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllExams,
  getExamById
};
