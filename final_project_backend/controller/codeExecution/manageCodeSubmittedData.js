const codeSubmision = require("../../models/codeSubmision/codeSubmision");
const Question = require("../../models/question_testcase_submission/question"); // Import the LabQuestion and TestCase models
const Difficulty = require("../../models/codeSubmision/difficultyCounter");

const getAllDifficultyData = async (req, res) => {
    const { userId} = req.params;
  try {
     easyCount = 0
     mediumCount = 0
    hardCount = 0
    totalCount = 0
    const submittedCodes = await codeSubmision.findOne(
        {
            where:{
                userId:userId

        }}
    );

    const question = submittedCodes.dataValues.questionId;
    console.log(question)

    const questionTagFetch = await Question.findOne({
      where: {
        id: question,
      },
    });
    
    tag = questionTagFetch.dataValues.difficulty


    if (tag == "easy"){
        easyCount += 1

    }
    else if(tag == "medium"){
        mediumCount += 1
    } 
    else{
        hardCount += 1
    }
    totalCount = easyCount + mediumCount + hardCount

    const codes = await Difficulty.create({
      easyCount:easyCount, 
      mediumCount : mediumCount,
      hardCount : hardCount ,
      totalCount :totalCount

    });






    
    return res.status(200).json(codes);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};



module.exports = getAllDifficultyData;
