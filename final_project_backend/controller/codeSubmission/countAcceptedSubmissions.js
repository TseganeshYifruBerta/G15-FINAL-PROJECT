const codeSubmision = require("../../models/codeSubmision/codeSubmision");
const Question = require("../../models/question_testcase_submission/question"); // Import the LabQuestion and TestCase models
const Status = require("../../models/codeSubmision/codeStatus")
const sequelize = require("../../database/sequelize")

const fetchingAllSubmittedQuestionForUser = async (req, res) => {
  const { userId } = req.params;

  try {  
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

const fetchingAllDetailForSubmittedQuestion = async (req, res) => {
  const { submittedId } = req.params;

  try {
    const questionStatus = await Status.findOne({
      where: {
        submittedCodeId: submittedId,
      },
    });



    return res.status(200).json(questionStatus);
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

module.exports = {
  fetchingAllSubmittedQuestionForUser,
  fetchingAllDetailForSubmittedQuestion,
  countAcceptedSubmissionsPerUser,
  countAcceptedSubmissionsOfUserBySection
};

