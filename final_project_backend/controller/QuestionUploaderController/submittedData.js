const codeSubmision = require("../../models/codeSubmision/codeSubmision");
const Question = require("../../models/question_testcase_submission/question"); // Import the LabQuestion and TestCase models
const Status = require("../../models/codeSubmision/codeStatus")

const fetchingAllSubmittedQuestionForUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const questionSubmittedFetch = await codeSubmision.findAll({
      where: {
        userId: userId,
      },
    });
   

    // const questionIds = questionSubmittedFetch.map(
    //   (submission) => submission.questionId
    // );
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
  const { submittedId} = req.params;

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
module.exports = {
  fetchingAllSubmittedQuestionForUser,
  fetchingAllDetailForSubmittedQuestion,
};

const countAcceptedSubmissionsForUser = async (userId) => {
  try {
    const questionSubmittedFetch = await codeSubmision.findAll({
      where: {
        userId: userId,
      },
    });

    const acceptedCount = questionSubmittedFetch.reduce((count, submission) => {
      if (submission.status === 'Accepted') {
        return count + 1;
      }
      return count;
    }, 0);

    return acceptedCount;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to count accepted submissions');
  }
};

module.exports = { fetchingAllSubmittedQuestionForUser, countAcceptedSubmissionsForUser };

