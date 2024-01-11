// controllers/questionController.js
const  examQuestion  = require("../../models/exam/testcase"); // Import the LabQuestion and TestCase models
const TestCase = require('../../models/exam/solution')
// Controller function to submit a question along with its test cases
const submitQuestionWithTestCasesAndSolution = async (req, res) => {
const { title, difficulty, description, example, testCases,tag } = req.body;

  try {
    // Create a new LabQuestion
    const newExamQuestion = await examQuestion.create({
      title,
      difficulty,
      description,
      example,
      tag
    });

    // Create and associate test cases with the new LabQuestion
    // Create and associate test cases with the new LabQuestion
    const createdTestCases = await Promise.all(
      testCases.map(async (testCase) => {
        const formattedOutput = Array.isArray(testCase.output
          )
          ? testCase.output
          : [testCase.output]; // Ensure output is an array
        return await TestCase.create({
          nums: testCase.input.nums,
          target: testCase.input.target,
          output: formattedOutput,
          labQuestionId: newExamQuestion.id, // Associate the test case with the new LabQuestion
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
