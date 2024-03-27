const ExamQuestion = require("../../../models/exam/uploadExamQuestion")
const examTestCase = require("../../../models/exam/examTestcase")
const Solution = require("../../../models/exam/solution")
const getAllExamQuestions = async (req, res) => {
    try {
      const questions = await ExamQuestion.findAll({
        include: [
          {
            model: examTestCase,
            as: "examTestCase",
            attributes: ["input", "output"],
          },
          {
            model: Solution,
            as: "solutions",
            attributes: ["content"],
          },
        ],
      });
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
