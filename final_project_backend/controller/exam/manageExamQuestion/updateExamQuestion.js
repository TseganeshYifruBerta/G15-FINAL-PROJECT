const ExamQuestion = require("../../../models/exam/createExam")

const editExamQuestion = async (req, res) => {
    const { examQuesId } = req.params;
    const updatedData = req.body;
  
    try {
      const examQuestion = await ExamQuestion.findByPk(examQuesId);
      if (!examQuestion) {
        return res.status(404).json({ error: "Question not found" });
      }
  
      // Update the question fields with the updatedData
      await examQuestion.update(updatedData);
  
      return res.status(200).json({ message: "Question updated successfully", question });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  };
  module.exports = editExamQuestion

  

