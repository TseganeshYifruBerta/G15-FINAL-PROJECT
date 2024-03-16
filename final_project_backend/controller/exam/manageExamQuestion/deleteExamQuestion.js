const { model } = require("../../../database/sequelize");
const ExamQuestion = require("../../../models/exam/createExam")
const deleteExamQuestion = async (req, res) => {
    const { examQuesId } = req.params;
  
    try {
      const examQuestion = await ExamQuestion.findByPk(examQuesId);
      if (!examQuestion) {
        return res.status(404).json({ error: "Exam Question not found" });
      }
  
      // Delete the question
      await examQuestion.destroy();
      return res.status(200).json({ message: "Question deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  };
module.exports= deleteExamQuestion
  