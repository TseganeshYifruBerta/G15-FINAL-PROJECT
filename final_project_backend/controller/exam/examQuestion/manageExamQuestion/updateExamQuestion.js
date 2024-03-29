const ExamQuestion = require("../../../../models/exam/uploadExamQuestion");
const TestCase = require("../../../../models/exam/examTestcase");
const Solution = require("../../../../models/exam/solution");
const sequelize = require('../../../../database/sequelize');
const User = require("../../../../models/auth/user.model");

const editExamQuestion = async (req, res) => {
  try {
    const { title, difficulty, description, example, testcases, solutions } = req.body;
    const { teacherId, examId } = req.params;

    const examQuestion = await ExamQuestion.findOne({
      where: {
        id: examId,
        teacherId: teacherId
      }
    });

    if (!examQuestion) {
      return res.status(404).json({ message: 'examQuestion not found' });
    }

    const foundUser = await User.findOne({  
      where: {
        id: teacherId
      }
    });
    if(!foundUser){ 
      return res.status(404).json({ message: 'User not found' });
    }

    // Start a transaction
    const transaction = await sequelize.transaction();

    try {
      // Update exam question
      examQuestion.title = title;
      examQuestion.difficulty = difficulty;
      examQuestion.description = description;
      examQuestion.example = example;
      await examQuestion.save({ transaction });

      // Update test cases
      if (testcases) {
        await Promise.all(
          testcases.map(async (testCase) => {
            const formattedOutput = Array.isArray(testCase.output) ? testCase.output : [testCase.output];
            const formattedInput = Array.isArray(testCase.input) ? testCase.input : [testCase.input];
            const testcaseId = testCase.id;

            await TestCase.update(
              { input: formattedInput, output: formattedOutput },
              { where: { examQuestionId: examId, id: testcaseId }, transaction }
            );
          })
        );
      }

      // Update solutions
      if (solutions ) {
        await Promise.all(solutions.map(async (solution) => {
          const solutionId = solution.id;
          console.log("///////////",solutionId);
          console.log("///////////",solution.content);
          await Solution.update(
            { content: solution.content },
            { where: { examQuestionId: examId, id: solutionId}, transaction }
          );
        }));
      }

      // Commit the transaction
      await transaction.commit();

      // Fetch updated data
      const updatedExamQuestion = await ExamQuestion.findByPk(examId);
      const updatedTestCases = await TestCase.findAll({ where: { examQuestionId: examId } });
      const updatedSolution = await Solution.findAll({ where: { examQuestionId: examId } });

      return res.status(200).json({ examQuestion: updatedExamQuestion, testCases: updatedTestCases, solution: updatedSolution });
    } catch (error) {
      await transaction.rollback();
      console.error(error);
      return res.status(500).json({ message: 'Failed to update Exam Question' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = editExamQuestion;
