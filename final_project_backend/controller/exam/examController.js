
const ExamQuestion = require("../../models/exam/createExam");
const examTestCase = require("../../models/exam/examTestcase");
const Solution = require("../../models/exam/solution");


const submitExamQuestionWithTestCaseAndSolution = async (req, res) => {
  const { title, difficulty, questions, example, testcases, solution } = req.body;

  try {
    // Create a new question

    const newQuestion = await ExamQuestion.create({

      title,
      difficulty,
      questions,
      example,
    });

    // Create and associate test cases with the new question
    const createdTestCases = await Promise.all(
      testcases.map(async (testcase) => {
        const formattedOutput = Array.isArray(testcase.output)
          ? testcase.output
          : [testcase.output]; // Ensure output is an array

        return await examTestCase.create({

          input: testcase.input,
          output: formattedOutput,
          questionId: newQuestion.id,
        });
      })
    );

    // Create a new solution
    const newSolution = await Solution.create({
      content: solution,
      questionId: newQuestion.id,
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


module.exports =  submitExamQuestionWithTestCaseAndSolution ;

