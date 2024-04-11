const sequelize  = require("../../../database/sequelize");
const studentsExamAnswer = require("../../../models/exam/studentsExamAnswer");
const studentsExamDetail = require("../../../models/exam/submittedExamDetail");


const submitExamAnswerByStudent = async (req, res) => {
  const { examId, userId, questionAndSolution } = req.body;

  const t = await sequelize.transaction();
  
  try {
    const studentsExamAnswers = await studentsExamAnswer.create(
      {
        examId,
        // userId,
        UserinformationId: userId,
      },
      { transaction: t }
    );

    const questionAndSolutions = await Promise.all(
      questionAndSolution.map(async (questionAndSolution) => {
        return await studentsExamDetail.create(
          {
            examQuestionId: questionAndSolution.questionId,
            submittedAnswer: questionAndSolution.submittedAnswer,
            studentsExamAnswerId: studentsExamAnswers.id,
          },
          { transaction: t }
        );
      })
    );

    await t.commit();

    res.status(201).json({
      message: "Question and test cases submitted successfully",
      ExamAndUser: studentsExamAnswers,
      QuestionAndAnswer: questionAndSolutions,
    });
  } catch (error) {
    await t.rollback();
    res.status(500).json({
      message: "Error submitting question and test cases",
      error: error.message,
    });
  }
};

module.exports = submitExamAnswerByStudent;
