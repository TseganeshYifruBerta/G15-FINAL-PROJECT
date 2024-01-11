// controllers/questionController.js
const  Question  = require("../../models/question_testcase_submission/question"); // Import the LabQuestion and TestCase models
const TestCase = require('../../models/question_testcase_submission/testCase')
// Controller function to submit a question along with its test cases
const submitQuestionWithTestCases = async (req, res) => {
  const { title, difficulty, description, example, testCases } = req.body;

  try {
    // Create a new LabQuestion
    const newQuestion = await Question.create({
      title,
      difficulty,
      description,
      example,
    });

    // Create and associate test cases with the new LabQuestion
    // Create and associate test cases with the new LabQuestion
    const createdTestCases = await Promise.all(
      testCases.map(async (testCase) => {
        const formattedOutput = Array.isArray(testCase.output)
          ? testCase.output
          : [testCase.output]; // Ensure output is an array
          const formattedInput = Array.isArray(testCase.input)
            ? testCase.input
            : [testCase.input.score]; 
        return await TestCase.create({
          // nums: testCase.input.nums,
          // target: testCase.input.target,
          
          input:formattedInput,


          output: formattedOutput,
          labQuestionId: newQuestion.id, // Associate the test case with the new LabQuestion
        });
      })
    );
   
    res.status(201).json({
      message: "Question and test cases submitted successfully",
      question: newQuestion,
      testCases: createdTestCases,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error submitting question and test cases",
        error: error.message,
      });
  }
};
module.exports = { submitQuestionWithTestCases };


