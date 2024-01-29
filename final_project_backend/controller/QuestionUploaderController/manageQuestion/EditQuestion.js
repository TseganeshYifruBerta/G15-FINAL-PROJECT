const Question = require("../../../models/question_testcase_submission/question")

const editQuestion = async (req, res) => {
    const { questionId } = req.params;
    const updatedData = req.body;
  
    try {
      const question = await Question.findByPk(questionId);
      if (!question) {
        return res.status(404).json({ error: "Question not found" });
      }
  
      // Update the question fields with the updatedData
      await question.update(updatedData);
  
      return res.status(200).json({ message: "Question updated successfully", question });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  };
  module.exports = {
    editQuestion,

  }

