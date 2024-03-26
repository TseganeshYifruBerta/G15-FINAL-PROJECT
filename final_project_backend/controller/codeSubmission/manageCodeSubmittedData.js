const codeSubmision = require("../../models/codeSubmision/codeSubmision");
const Question = require("../../models/question_testcase_submission/question"); // Import the LabQuestion and TestCase models
const Difficulty = require("../../models/codeSubmision/difficultyCounter");

const getAllDifficultyData = async (req, res) => {
   
  try {
    const questionTagFetch = await Difficulty.findAll();
  
    return res.status(200).json(questionTagFetch);
    
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};



module.exports = getAllDifficultyData;
