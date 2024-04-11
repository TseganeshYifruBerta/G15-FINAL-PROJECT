const ExamQuestion = require("../../../models/exam/uploadExamQuestion");
const examTestCase = require("../../../models/exam/examTestcase");
const Solution = require("../../../models/exam/solution");
const sequelize = require("../../../database/sequelize")



const getExamQuestionFilteredByTeacher = async (req, res) => {
  const { id } = req.params;

  try {
    await sequelize.transaction(async (t) => {
      const examQuestion = await ExamQuestion.findAll({
        where: {
          teacherId: id,
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

  
    const allExamQuestionByTeacher = examQuestion.map((question) => {
        question.examTestCase.forEach(testCase => {
            testCase.input = JSON.parse(testCase.input);
            testCase.output = JSON.parse(testCase.output);
        });
        return question;  
    }
    );
  


      return res.status(200).json({ allExamQuestionByTeacher });
    });
  } catch (error) {
    
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = getExamQuestionFilteredByTeacher;