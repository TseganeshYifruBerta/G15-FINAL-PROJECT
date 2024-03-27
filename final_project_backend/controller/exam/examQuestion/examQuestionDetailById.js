const ExamQuestion = require("../../../models/exam/uploadExamQuestion");
const examTestCase = require("../../../models/exam/examTestcase");
const Solution = require("../../../models/exam/solution");
const sequelize = require("../../../database/sequelize")



const examQuestionDetailById = async (req, res) => {
  const { examQuestionId } = req.params;

  try {
    await sequelize.transaction(async (t) => {
      const examQuestion = await ExamQuestion.findOne({
        where: {
          id: examQuestionId,
        },
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
        transaction: t, // Include the transaction in the query
      });

      if (!examQuestion) {
        return res.status(404).json({ message: "Exam question not found" });
      }

      return res.status(200).json({ examQuestion });
    });
  } catch (error) {
    
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = examQuestionDetailById;