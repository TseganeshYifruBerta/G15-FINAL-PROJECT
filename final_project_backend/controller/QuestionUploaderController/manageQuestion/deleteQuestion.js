const Question = require("../../../models/question_testcase_submission/question")
const sequelize = require("../../../database/sequelize")
const TestCase = require("../../../models/question_testcase_submission/testCase")
const deleteQuestion = async (req, res) => {
    const { id } = req.params;
  
    try {
      const question = await Question.findByPk(id);
      if (!question) {
        return res.status(404).json({ error: "Question not found" });
      }
      const transaction = await sequelize.transaction();

      try {
        await TestCase.destroy({ where: { labQuestionId: id }, transaction });
  
        
        await question.destroy({ transaction });
  
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
  