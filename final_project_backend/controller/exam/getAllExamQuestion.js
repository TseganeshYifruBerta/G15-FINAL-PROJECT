const ExamQuestion = require("../../models/exam/createExam")
const getAllExamQuestions = async (req, res) => {
    try {
      const questions = await ExamQuestion.findAll();
      if (!questions) {
        return res.sendStatus(400);
      }
      return res.status(200).json(questions);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };

  module.exports = getAllExamQuestions