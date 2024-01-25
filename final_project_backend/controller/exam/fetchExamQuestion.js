const ExamQuestion = require("../../models/question_testcase_submission/examQuestion");

const getAllExamQuestions = async (req, res) => {
  try {
    const examQuestions = await ExamQuestion.findAll();
    if (!examQuestions) {
      return res.sendStatus(400);
    }
    return res.status(200).json(examQuestions);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

module.exports = { getAllExamQuestions };