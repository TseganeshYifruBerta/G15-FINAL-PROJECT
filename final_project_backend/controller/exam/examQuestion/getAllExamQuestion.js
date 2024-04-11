const ExamQuestion = require("../../../models/exam/uploadExamQuestion")
const examTestCase = require("../../../models/exam/examTestcase")
const Solution = require("../../../models/exam/solution")
const getAllExamQuestions = async (req, res) => {
    try {
      const allQuestions = await ExamQuestion.findAll({
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
      });
      if (!allQuestions) {
        return res.status(400).json({ message: "No questions found" });
      }

    //   const allExamQuestion = allQuestions.map((question) => {
    //     allQuestions.examTestCase.forEach(testCase => {
    //         testCase.input = JSON.parse(testCase.input);
    //         testCase.output = JSON.parse(testCase.output);
    //     });
    //     return question;  
    // }
    // );
      
    const combinedResult = allQuestions.map((question) => {
      
      
    
        question.examTestCase.forEach(testCase => {
            testCase.input = JSON.parse(testCase.input);
            testCase.output = JSON.parse(testCase.output);
        });
        return question;
      });

      return res.status(200).json({combinedResult});
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  module.exports = getAllExamQuestions
