const ExamQuestion = require("../../../../models/exam/createExam")
const TestCase = require("../../../../models/exam/examTestcase")
const Solution = require("../../../../models/exam/solution")
const sequelize = require('../../../../database/sequelize'); // Import sequelize instance

const editExamQuestion = async (req, res) => {
  try {
    const { title, difficulty, description, example, testcases, solution } = req.body;
    const { id } = req.params;

    const examQuestion = await ExamQuestion.findByPk(id);


    if (!examQuestion) {
      return res.status(404).json({ message: 'examQuestion not found' });
    }

    // Start a transaction
    const transaction = await sequelize.transaction();

    try {

      examQuestion.title = title;
      examQuestion.difficulty = difficulty;
      examQuestion.description = description;
      examQuestion.example = example;
      await examQuestion.save({ transaction });


      if (testcases) {
        await Promise.all(
          testcases.map(async (testCase) => {
            const formattedOutput = Array.isArray(testCase.output
            )
              ? testCase.output
              : [testCase.output]; // Ensure output is an array
            const formattedInput = Array.isArray(testCase.input)
              ? testCase.input
              : [testCase.input];
            const testcaseId = testCase.id;


            await TestCase.update(
              { input: formattedInput, output: formattedOutput },
              { where: { examQuestionId: id, id: testcaseId }, transaction }
            );
          })
        );
      }


      // // Check if the section data is provided
      if (solution) {
        await Solution.update(
          { solution: solution },
          { where: { examQuestionId: id }, transaction }
        )

      }

      // Commit the transaction
      await transaction.commit();
      const updatedExamQuestion = await ExamQuestion.findByPk(id);
      const updatedTestCases = await TestCase.findAll({ where: { examQuestionId: id } });
      const updatedSolution = await Solution.findOne({ where: { examQuestionId: id } });

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
}
module.exports = editExamQuestion



