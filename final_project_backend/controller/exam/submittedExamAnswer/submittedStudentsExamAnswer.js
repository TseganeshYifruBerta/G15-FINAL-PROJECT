const sequelize  = require("../../../database/sequelize");
const SelectedQuestionForExam = require("../../../models/exam/SelectedQuestionForExam");
const studentsExamAnswer = require("../../../models/exam/studentsExamAnswer");
const studentsExamDetail = require("../../../models/exam/submittedExamDetail");
const Exam = require("../../../models/exam/createExam");
const User = require("../../../models/auth/user.model");

const submitExamAnswerByStudent = async (req, res) => {
  const { examId, userId, questionAndSolution } = req.body;
  const t = await sequelize.transaction();

  try {
    const examFound = await Exam.findOne({ where: { id: examId } }, { transaction: t });
    const userFound = await User.findOne({ where: { id: userId } }, { transaction: t });
    if (!examFound || !userFound) {
      await t.rollback(); 
      return res.status(404).json({ message: "Exam or user not found" });
    }

    const studentsExamAnswers = await studentsExamAnswer.create({
      examId,
      UserinformationId: userId,
    }, { transaction: t });

    let errors = [];
    const questionAndSolutions = (await Promise.all(
      questionAndSolution.map(async (item) => {
        const { questionId, submittedAnswer } = item;
        const questionExists = await SelectedQuestionForExam.findOne({
          where: { examId, question_ids: questionId },
          transaction: t
        });

        if (!questionExists) {
          errors.push(`Question ID ${questionId} not found in exam`);
          return null;
        } else {
          return studentsExamDetail.create({
            examQuestionId: questionId,
            submittedAnswer,
            studentsExamAnswerId: studentsExamAnswers.id,
          }, { transaction: t });
        }
      })
    )).filter(item => item !== null); // Filter out the nulls

    if (errors.length > 0) {
      await t.rollback();
      return res.status(400).json({ message: "Some questions not found in the exam", errors });
    }

    await t.commit();
    res.status(201).json({
      message: "Questions and answers submitted successfully",
      details: {
        ExamAndUser: studentsExamAnswers,
        QuestionAndAnswer: questionAndSolutions,
      },
    });
  } catch (error) {
    await t.rollback();
    res.status(500).json({
      message: "Error submitting questions and answers",
      error: error.message,
    });
  }
};


module.exports = submitExamAnswerByStudent;
