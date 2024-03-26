const Question = require("../../../models/question_testcase_submission/question")
const sequelize = require("../../../database/sequelize")
const TestCase = require("../../../models/question_testcase_submission/testCase")
const User = require("../../../models/auth/user.model")
const deleteQuestion = async (req, res) => {
    const { id,teacherId } = req.params;
  
    try {
      const question = await Question.findByPk(id);
      if (!question) {
        return res.status(404).json({ error: "Question not found" });
      }
      const questionByTeacher = await Question.findOne({
        where:{
          id:id,
          teacherId:teacherId
        }
      })

      if (!questionByTeacher) {
        return res.status(404).json({ message: "You are not a privileged teacher to delete this question." });
      }
      const teacherStatus = await User.findOne({
        where:{
          id:teacherId
        }
      })

      if (teacherStatus.status === "active" ){


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
    else{
      res.status(403).json({ message: "The user is not activated" })
    }
    }
    catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
     }

};
  module.exports= deleteQuestion
  