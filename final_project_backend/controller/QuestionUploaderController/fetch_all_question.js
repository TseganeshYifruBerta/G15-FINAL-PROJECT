const Question = require("../../models/question_testcase_submission/question"); // Import the LabQuestion and TestCase models

const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.findAll();
    if (!questions) {
      return res.sendStatus(400);
    }
    return res.status(200).json(questions);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
module.exports = { getAllQuestions };
