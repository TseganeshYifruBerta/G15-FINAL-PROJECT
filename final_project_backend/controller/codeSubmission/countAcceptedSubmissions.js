const codeSubmision = require("../../models/codeSubmision/codeSubmision");
const Question = require("../../models/question_testcase_submission/question"); // Import the LabQuestion and TestCase models
const Status = require("../../models/codeSubmision/codeStatus")
const sequelize = require("../../database/sequelize");
const User = require("../../models/auth/user.model");
const TestCase = require("../../models/question_testcase_submission/testCase");

const fetchingAllAcceptedSubmittedQuestionsPerUser = async (req, res) => {
  const { userId } = req.params;

  try {
    // Check if the user exists
    const foundUser = await User.findOne({
      where: {
        id: userId
      }
    });
    if (!foundUser) {
      return res.status(400).json({ message: "The user is not found" });
    }

    // Fetch all submissions for the user
    const questionSubmittedFetch = await codeSubmision.findAll({
      where: {
        userId: userId,
      },
    });

    const acceptedQuestions = [];

    // Iterate over each submission
    for (const submission of questionSubmittedFetch) {
      // Check if the submission has an "Accepted" status
      const questionStatus = await Status.findOne({
        where: {
          submittedCodeId: submission.id,
          status: "Accepted",
        },
      });

      if (questionStatus) { // If the status is "Accepted"
        // Fetch the associated question details
        const questionsForId = await Question.findOne({
          where: {
            id: submission.questionId,
          },
          include: [
            {
              model: TestCase,
              where: {
                labQuestionId: submission.questionId
              },
              as: "TestCases"
            }
          ]
        });

        // Push the accepted question along with its status and submission id
        acceptedQuestions.push({
          questionsForId,
          questionStatus,
          id: submission.id
        });
      }
    }

    return res.status(200).json(acceptedQuestions);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


const fetchStatusForSpecificQuestion = async (req, res) => {
  const { userId, questionId } = req.params;

  const questionStatus = await Status.findAll({
    where: {
      questionId: questionId,
      UserinformationId: userId,
    },
  });

 if(questionStatus.length === 0) {
   return res.status(400).json({message:"The user has not submitted this question"})
 }
  return res.status(200).json({questionStatus});

}


const fetchingDetailForAcceptedSubmittedQuestion = async (req, res) => {
  const {  userId , submittedId  } = req.params;

  try {
    const foundUser = await User.findOne({
      where:{
        id:userId
      }
    })
    if(!foundUser) {
      return res.status(400).json({message:"The user is not found"})
    }
    const questionStatus = await Status.findOne({
      where: {
        submittedCodeId: submittedId,
      },
    });
    const questionSubmitted = await Question.findOne({
      where: {
        id: questionStatus.id,
      },
    });



    return res.status(200).json({questionStatus, questionSubmitted});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};



const countAcceptedSubmissionsPerUser = async (req, res) => {
  const { userId } = req.params
  try {
    const submissions = await codeSubmision.findAll({
      where: {
        userId: userId,
      },
    });
    let acceptedCount = 0
    for (const submission of submissions) {
      const status = await Status.findOne({
        where: {
          submittedCodeId: submission.id,
          status: 'Accepted'
        },

      });
      if (status) {
        acceptedCount++;
      }
    }
    return res.status(200).json(acceptedCount);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }


}

const countAcceptedSubmissionsOfUserBySection = async (req, res) => {
  const { section } = req.params
  const transaction = await sequelize.transaction();
  try {
    const submissions = await codeSubmision.findAll({
      where: {
        section: section,
      },
      transaction

    });
    let acceptedCount = 0
    for (const submission of submissions) {
      const status = await Status.findOne({
        where: {
          submittedCodeId: submission.id,
          status: 'Accepted'
        },
        transaction
      });
      if (status) {
        acceptedCount++;
      }
    }
    await transaction.commit();
    return res.status(200).json(acceptedCount);
  } catch (error) {
    await transaction.rollback();
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }


}

const countAcceptedSubmissionperDifficulty = async (req, res) => {
  const { userId } = req.params;
  try {
    const acceptedSubmissions = await codeSubmision.findAll({
      where: {
        userId: userId,
      },
      include: [
        {
          model: Status,
          as:"Status",
          where: {
            status: 'Accepted',
          },
        },
      ],
    });

    uniqueQuestionIds = new Set(acceptedSubmissions.map(submission => submission.questionId));


    let easyCount = 0;
    let mediumCount = 0;
    let hardCount = 0;
    const questions = await Question.findAll({  
      where: {
           id: Array.from(uniqueQuestionIds),
          },
  });
  // Count the questions based on their difficulty
  for (const question of questions) {  
        if (question.difficulty === 'easy') {
      easyCount++;      } 
      else if (question.difficulty === 'medium')
       {
      mediumCount++;      } 
      else if (question.difficulty === 'hard')
       {
      hardCount++;      }
  }
    return res.status(200).json({ easyCount, mediumCount, hardCount });
  }
  catch (error) {
    
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }}
  
  const submissionPerStudentOnSpecificQuestion = async (req, res) => {
    const { questionId ,studentId} = req.params;
    try {
      const submission = await codeSubmision.findAll({
        where: {
          questionId: questionId,
          userId: studentId
        },
        include: [
          {
            model: Status,
            as: "Status",
            
          }
        ]
      });
      return res.status(200).json(submission);
    } catch (error) {
      console.log(error);
      throw new Error("Failed to count submissions for date");
    }
  }
    





module.exports = {
  countAcceptedSubmissionperDifficulty,
  fetchingAllAcceptedSubmittedQuestionsPerUser,
  fetchingDetailForAcceptedSubmittedQuestion,
  countAcceptedSubmissionsPerUser,
  countAcceptedSubmissionsOfUserBySection,
  fetchStatusForSpecificQuestion,
  submissionPerStudentOnSpecificQuestion

};

