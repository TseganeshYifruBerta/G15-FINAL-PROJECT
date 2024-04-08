const codeSubmision = require("../../models/codeSubmision/codeSubmision");
const Question = require("../../models/question_testcase_submission/question"); // Import the LabQuestion and TestCase models
const Status = require("../../models/codeSubmision/codeStatus")
const sequelize = require("../../database/sequelize");
const User = require("../../models/auth/user.model");
const TestCase = require("../../models/question_testcase_submission/testCase");
const fetchingAllSubmittedQuestionsPerUser = async (req, res) => {
    const { userId } = req.params;
  
    try {  
      const foundUser = await User.findOne({
        where:{
          id:userId
        }
      })
      if(!foundUser) {
        return res.status(400).json({message:"The user is not found"})
      }
      const questionSubmittedFetch = await codeSubmision.findAll({
        where: {
          userId: userId,
        },
      });
     
      const Ids = questionSubmittedFetch.map(
        (submission) => submission.id
      );
  
      const allQuestions = [];
      for (const id of Ids) {
        const f = await codeSubmision.findOne({
          where: {
            id: id,
          },
        });
        const questionsForId = await Question.findOne({
          where: {
            id: f.questionId,
          },
          include : [
            {
              model: TestCase,
              where: {
                labQuestionId: f.questionId
              },
              as: "TestCases"
            }
          ]
  
        });
        const questionStatus = await Status.findOne({
          where: {
            submittedCodeId: id,
           
          },
        });
        const a = {
          questionsForId,
          questionStatus,
          id
        };
        allQuestions.push(a);
      }
  
      return res.status(200).json(allQuestions);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };


module.exports = fetchingAllSubmittedQuestionsPerUser