const sequelize  = require("../../../database/sequelize");
const SelectedQuestionForExam = require("../../../models/exam/SelectedQuestionForExam");
const studentsExamAnswer = require("../../../models/exam/studentsExamAnswer");

const Exam = require("../../../models/exam/createExam");
const User = require("../../../models/auth/user.model");

const submitExamAnswerByStudent = async (req, res) => {
  const { examId, userId, questionId , solution} = req.body;
  // let id = req.user
  const t = await sequelize.transaction();

  try {

    const examFound = await Exam.findOne({ where: { id: examId } }, { transaction: t });
    const userFound = await User.findOne({ where: { id: userId } }, { transaction: t });
    formerSubmmision = await studentsExamAnswer.findOne(
      {where: 
        {  examId: examId,
           UserinformationId: userId
          , examQuestionId: questionId},
           transaction: t});
    if(formerSubmmision){
      await t.rollback();
      return res.status(400).json({ message: "You have already submitted an answer for this question"});
    }
    if (!examFound || !userFound) {
      await t.rollback(); 
      return res.status(404).json({ message: "Exam or user not found" });
    }



    let errors = [];
    const questionExists = await SelectedQuestionForExam.findOne({
      where: { examId, question_ids: questionId },
      transaction: t
    });

    if (!questionExists) {
      errors.push(`Question ID ${questionId} not found in exam`);
      await t.rollback();
      return res.status(400).json({ message: `Question ID ${questionId} not found in exam`});
   
    } else {
      var answer = await studentsExamAnswer.create({
        examQuestionId: questionId,
        submittedAnswer:solution,
        examId:examId,
        UserinformationId: userId,
      }, { transaction: t });
    }
      
    if (errors.length > 0) {
      await t.rollback();
      return res.status(400).json({ message: "Some questions not found in the exam", errors });
    }

    await t.commit();
    res.status(201).json({
      message: "Questions and answers submitted successfully",
      details: {
        
       answer,
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
