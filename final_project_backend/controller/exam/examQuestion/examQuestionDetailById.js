const ExamQuestion = require("../../../models/exam/uploadExamQuestion");
const examTestCase = require("../../../models/exam/examTestcase");
const Solution = require("../../../models/exam/solution");
const sequelize = require("../../../database/sequelize")



const examQuestionDetailById = async (req, res) => {
  const { examQuestionId } = req.params;

  try {
    await sequelize.transaction(async (t) => {
      const examQuestionDetail = await ExamQuestion.findOne({
        where: {
          id: examQuestionId,
        },
        include: [
          {
            model: examTestCase,
            as: "examTestCase",
            
          },
          {
            model: Solution,
            as: "solutions",
           
          },
        ],
        transaction: t, // Include the transaction in the query
      });

      if (!examQuestionDetail) {
        return res.status(404).json({ message: "Exam question not found" });
      }
      examQuestionDetail.examTestCase.forEach(testCase => {
        testCase.input = JSON.parse(testCase.input);
        testCase.output = JSON.parse(testCase.output);
    });
    

      return res.status(200).json({ examQuestionDetail });
    });
  } catch (error) {
    
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = examQuestionDetailById;