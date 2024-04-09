const Question = require("../../../models/question_testcase_submission/question");
const TestCase = require('../../../models/question_testcase_submission/testCase')

const sequelize = require("../../../database/sequelize");

const AddTestcases = async (req, res) => {
  const { testCases ,questionId} = req.body;

  try {
    transaction = await sequelize.transaction();
    const questionFound = await Question.findOne({
      where: {
        id: questionId
      },
      transaction
    })
    if(!questionFound){
        return res.status(400).json({message:"question is Not Found"})
    }
    
      const createdTestCases = await Promise.all(
        testCases.map(async (testCase) => {
          const formattedOutput = Array.isArray(testCase.output
          )
            ? testCase.output
            : [testCase.output]; 
          const formattedInput = Array.isArray(testCase.input)
            ? testCase.input
            : [testCase.input];
          return await TestCase.create({
        
            input: formattedInput,
            output: formattedOutput,
            labQuestionId: questionId, // Associate the test case with the new LabQuestion
          }, { transaction });
        })
      );
      await transaction.commit();

      res.status(201).json({
        message: "Question and test cases submitted successfully",
        testCases: createdTestCases,
      });

    

  } catch (error) {
    await transaction.rollback();
    res
      .status(500)
      .json({
        message: "Error submitting question and test cases",
        error: error.message,
      });
  }
};
const DeleteTestcases = async (req, res) => {
    const { testCasesId } = req.params;
  
    try {
      transaction = await sequelize.transaction();
      const testcaseFound = await TestCase.findOne({
        where: {
          id: testCasesId
        },
        transaction
      })
      if(!testcaseFound){
          return res.status(400).json({message:"testcase is Not Found"})
      }
      await TestCase.destroy({ where: { id: testCasesId }, transaction });
  
    

      await transaction.commit();
      
  
        res.status(201).json({
          message: "test cases deleted successfully",
          
        });
 
  
    } catch (error) {
      await transaction.rollback();
      res
        .status(500)
        .json({
          message: "Error submitting question and test cases",
          error: error.message,
        });
    }
  };
module.exports =  {AddTestcases,DeleteTestcases} ;


