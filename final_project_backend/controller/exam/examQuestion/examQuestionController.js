const ExamQuestion = require("../../../models/exam/uploadExamQuestion");
const examTestCase = require("../../../models/exam/examTestcase");
const Solution = require("../../../models/exam/solution");
const sequelize = require("../../../database/sequelize");

const User = require("../../../models/auth/user.model");
const submitExamQuestionWithTestCaseAndSolution = async (req, res) => {
  const { title, difficulty, description, example, testcases, solutions, teacherId ,tag ,chapter ,plagiarismRatio} = req.body;

  try {
    const transaction = await sequelize.transaction(); 
    
    const isTeacher = await User.findOne({ where: { id: teacherId, role: "teacher" } });
    if(!isTeacher) {
      return res.status(400).json({ message: "you are not a teacher"});
    }
    if (!title || !difficulty || !description || !example || !testcases || !teacherId || !tag || !chapter || !plagiarismRatio ) {
      return res.status(400).json({ message: "Please provide title , difficulty, description,example, testcases, tag,chapter,plagiarismRatio " });
    }

    const newQuestion = await ExamQuestion.create({
      title,
      difficulty,
      description,
      example,
      teacherId,
      tag,
      chapter,
      plagiarismRatio

    }, { transaction });

    // Create and associate test cases with the new question within the transaction
    const createdTestCases = await Promise.all(
      testcases.map(async (testcase) => {
        // const formattedOutput = Array.isArray(testcase.output) ? testcase.output : [testcase.output];
        // const formattedInput = Array.isArray(testcase.input) ? testcase.input : [testcase.input];

        return await examTestCase.create({
          // input: formattedInput,
          // output: formattedOutput,
          input: testcase.input,
          output: testcase.output,
          examQuestionId: newQuestion.id,
        }, { transaction });
      })
    );


    // Create solutions within the transaction
    if (solutions && solutions.length > 0) {
      await Promise.all(solutions.map(async (solution) => {
        await Solution.create({
          content: solution,
          examQuestionId: newQuestion.id,
        }, { transaction });
      }));
    }
    
  

    // Commit the transaction
    await transaction.commit();

    // Fetch solutions associated with the new question
    const solutionTable = await Solution.findAll({ where: { examQuestionId: newQuestion.id } });
    res.status(201).json({
      message: "Question, test cases, and solution submitted successfully",
      question: newQuestion,
      testCases: createdTestCases,
      solution: solutionTable,

    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error submitting question, test cases, and solution",
      error: error.message,
    });
  }
};

module.exports = submitExamQuestionWithTestCaseAndSolution;
