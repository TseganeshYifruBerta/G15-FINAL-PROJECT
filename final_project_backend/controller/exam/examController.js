const ExamQuestion = require("../../models/exam/createExam");
const TestCase = require("../../models/exam/solution");
const Solution = require("../../models/exam/testcase");

const submitExamQuestionWithTestCasesAndSolution = async (req, res) => {
  const { title, difficulty, description, example, testCases, solutions } = req.body;

  try {
    const newQuestion = await ExamQuestion.create({
      title,
      difficulty,
      description,
      example,
    });

    const createdTestCases = await Promise.all(
      testCases.map(async (testCase) => {
        const formattedOutput = Array.isArray(testCase.output)
          ? testCase.output
          : [testCase.output];
        const formattedInput = Array.isArray(testCase.input)
          ? testCase.input
          : [testCase.input];

        const createdTestCase = await TestCase.create({
          input: formattedInput,
          output: formattedOutput,
          questionId: newQuestion.id,
        });

        return createdTestCase;
      })
    );

    const createdSolutions = await Promise.all(
      solutions.map(async (solution) => {
        const createdSolution = await Solution.create({
          content: solution.content,
          questionId: newQuestion.id,
        });

        return createdSolution;
      })
    );

    res.status(201).json({
      message: "Exam question, test cases, and solutions submitted successfully",
      question: newQuestion,
      testCases: createdTestCases,
      solutions: createdSolutions,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error submitting exam question, test cases, and solutions",
      error: error.message,
    });
  }
};

module.exports = { submitExamQuestionWithTestCasesAndSolution };