const { model } = require("../../../database/sequelize");
const Question = require("../../../models/question_testcase_submission/question")
const deleteQuestion = async (req, res) => {
    const { questionId } = req.params;
  
    try {
      const question = await Question.findByPk(questionId);
      if (!question) {
        return res.status(404).json({ error: "Question not found" });
      }
      const transaction = await model.transaction();

      try {
        // Delete the associated test cases
        await TestCase.destroy({ where: { questionId: questionId }, transaction });
  
        // Delete the associated solution
  
        // Delete the question itself
        await question.destroy({ transaction });
  
        // Commit the transaction
        await transaction.commit();
  
        return res.status(200).json({ message: "Question deleted successfully" });
      } 
      catch (error) {
        // Rollback the transaction if there's an error
        await transaction.rollback();
        console.error(error);
        return res.status(500).json({ error: "Failed to delete question" });
      }
    }
    catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
     }

};
  module.exports=

    deleteQuestion
  