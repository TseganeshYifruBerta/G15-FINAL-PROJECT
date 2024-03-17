const Question = require("../../../models/question_testcase_submission/question")
const TestCase = require("../../../models/question_testcase_submission/testcase")

const editQuestion = async (req, res) => {
    try {
      const { title, difficulty, description, example, testcases, solution } = req.body;
      const { id } = req.params;
  
      const question = await Question.findByPk(id);
  
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
  
      // Start a transaction
      const transaction = await sequelize.transaction();
  
      try {
  
        question.title = title;
        question.difficulty = difficulty;
        question.description = description;
        question.example = example;
        await question.save({ transaction });
  
  
        if (testcases) {
          await Promise.all(
            testcases.map(async (testCase) => {
              const formattedOutput = Array.isArray(testCase.output)
                ? testCase.output
                : [testCase.output]; // Ensure output is an array
              const formattedInput = Array.isArray(testCase.input)
                ? testCase.input
                : [testCase.input];
              const testcaseId = testCase.id;
  
              await TestCase.update(
                { input: formattedInput, output: formattedOutput },
                { where: { questionId: id, id: testcaseId }, transaction }
              );
            })
          );
        }
  
        // // Check if the section data is provided
    
  
        // Commit the transaction
        await transaction.commit();
  
        return res.status(200).json({ message: "Question updated successfully" });
      } catch (error) {
        // Rollback the transaction if there's an error
        await transaction.rollback();
        console.error(error);
        return res.status(500).json({ error: "Failed to update question" });
      }
    }
    catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });}}
  
  module.exports = 
    editQuestion

