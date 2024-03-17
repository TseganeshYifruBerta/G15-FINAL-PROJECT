const CreatExam = require('../../../models/exam/createExam'); // Adjust the path as necessary
const Question = require('../../../models/exam/questions'); // Adjust the path as necessary
const Sections = require('../../../models/exam/section'); // Adjust the path as necessary
const ExamQuestion = require('../../../models/exam/uploadExamQuestion'); // Adjust the path as necessary
// Controller to get all exams
const getAllCreatedExams = async (req, res) => {
  try {
    const exam = await CreatExam.findAll();
    res.status(200).json(exam);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Controller to get an exam by ID
const getCreatedExamById = async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from the request parameters
    const exam = await CreatExam.findByPk(id);

    if (!exam) {
      res.status(404).send('Exam not found');
    }
    const questions = await Question.findAll({ where: { examId: id } });
    // console.log("/////////", questions)
      const examQuestions = await Promise.all(questions.map(async (question) => {
        return await ExamQuestion.findByPk(question.question_ids);

      }));
    

    // const  createdExamQuestion = await ExamQuestion.findAll({ where: { id: questions.id } });
    const createdExamSection = await Sections.findAll({ where: { examId: id } });

      res.status(200).json({exam, examQuestions, createdExamSection});
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllCreatedExams,
  getCreatedExamById
};
