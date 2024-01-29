const Question = require("../../models/exam/createExam");
const TestCase = require("../../models/exam/solution");
const Solution = require("../../models/exam/testcase");

const submitExamQuestionWithTestCaseAndSolution = async (req, res) => {
  const { title, difficulty,description , example, testcases, solution } = req.body;

  try {
    // Create a new question

    const newQuestion = await ExamQuestion.create({
      title,
      difficulty,
      description,
      example,
    });

    // Create and associate test cases with the new question
    const createdTestCases = await Promise.all(
      testcases.map(async (testcase) => {
        const formattedOutput = Array.isArray(testcase.output)
          ? testcase.output
          : [testcase.output]; // Ensure output is an array
          const formattedInput = Array.isArray(testcase.input)
            ? testcase.input
            : [testcase.input];

        return await examTestCase.create({
          input: formattedInput,
          output: formattedOutput,
          examQuestionId: newQuestion.id,
        });
      })
    );
   
    // Create a new solution

    const newSolution = await Solution.create({
      content: solution,
      examQuestionId: newQuestion.id,
    });


    res.status(201).json({
      message: "Question, test cases, and solution submitted successfully",
      question: newQuestion,
      testCases: createdTestCases,
      solution: newSolution,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error submitting question, test cases, and solution",
      error: error.message,
    });
  }
};

module.exports = { submitExamQuestionWithTestCaseAndSolution };