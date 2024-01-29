const Question = require("../../models/question_testcase_submission/question"); // Import the LabQuestion and TestCase models
const Status = require("../../models/codeSubmision/codeStatus");



const getNumberOfAllQuestion = async(req,res) =>{
      try{
        const question = await Question.findAll();
        const count = question.length;
        return res.status(200).json(count)
       
      } catch(error){
       console.log(error);
       return res.sendStatus(400);
      }
};



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

const getAllQuestionsById = async (req, res) => {
  const { userId, questionId } = req.params;
  try {
    const question = await Question.findOne({
      where: {
        id: questionId,
      },
    });

    const allStatus = await Status.findAll({
      where: {
        userId: userId,
        questionId: questionId,
      },
    });

    if (question) {
      res.status(200).json({ question, allStatus }); // Send the student data as a JSON response
    } else {
      res.status(404).send("question is  not found");
    }
  } catch (error) {
    res.status(500).send("An error occurred: " + error.message);
  }
};

module.exports = { getAllQuestions, getAllQuestionsById , getNumberOfAllQuestion};
