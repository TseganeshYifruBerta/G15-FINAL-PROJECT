const ExamQuestion = require("../../models/exam/createExam");

const getExamQuestionById = async (req, res) => {
  const { id } = req.params;
  try {
    const examQuestion = await ExamQuestion.findByPk(id);
    if (!examQuestion) {
      return res.sendStatus(404);
    }
    return res.status(200).json(examQuestion);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

module.exports = getExamQuestionById ;