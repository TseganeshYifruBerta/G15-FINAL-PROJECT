
const ExamQuestion = require("../../../models/exam/uploadExamQuestion");
const examTestCase = require("../../../models/exam/examTestcase");
const Solution = require("../../../models/exam/solution");


const submitExamQuestionWithTestCaseAndSolution = async (req, res) => {
  const { title, difficulty, description, example, testcases, solutions , teacherId} = req.body;

  try {
    // Create a new question

    const newQuestion = await ExamQuestion.create({
      title,
      difficulty,
      description,
      example,
      teacherId
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

    if (solutions && solutions.length > 0) {
      await Promise.all(solutions.map(async (solution) => {
       await Solution.create({
          content: solution,
          examQuestionId: newQuestion.id,
        });
      }));
    }

    const solutiontable = await Solution.findAll({ where: { examQuestionId: newQuestion.id } });

    res.status(201).json({
      message: "Question, test cases, and solution submitted successfully",
      newQuestion,
      question: newQuestion,
      testCases: createdTestCases,
      solution: solutiontable,
    

    });
  } catch (error) {
    res.status(500).json({
      message: "Error submitting question, test cases, and solution",
      error: error.message,
    });
  }
};



module.exports = submitExamQuestionWithTestCaseAndSolution;


