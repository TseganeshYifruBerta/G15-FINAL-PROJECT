const studentsExamAnswer = require("../../models/exam/studentsExamAnswer");
const {Sequelize} = require("sequelize");

const fetchAnswersExcludingUser = async (userId, questionId,examId) => {
  // const { userId, questionId} = req.body;
  try {
    const answers = await studentsExamAnswer.findAll({
      where: {
        examQuestionId: questionId,
        examId: examId,
        [Sequelize.Op.not]: [
          { '$studentsExamAnswer.UserinformationId$': userId }
        ]
      },
      
    });
    return  answers;
    // return res.status(200).json({ answers });
  } catch (error) {
    console.error("Error fetching answers:", error);
    throw error; 
  }
};


module.exports = fetchAnswersExcludingUser;
