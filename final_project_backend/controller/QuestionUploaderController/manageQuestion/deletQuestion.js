const { model } = require("../../../database/sequelize");
const Question = require("../../../models/question_testcase_submission/question")
const deleteQuestion = async (req, res) => {
    const { questionId } = req.params;
  
    try {
      const question = await Question.findByPk(questionId);
      if (!question) {
        return res.status(404).json({ error: "Question not found" });
      }
  
      // Delete the question
      await question.destroy();
  
      return res.status(200).json({ message: "Question deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  };
  model.exports={

    deleteQuestion,
  }