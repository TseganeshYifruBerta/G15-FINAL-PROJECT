const studentsExamAnswer = require("../../models/exam/studentsExamAnswer");
const {Sequelize} = require("sequelize");
const studentsExamDetail = require("../../models/exam/submittedExamDetail"); // Import the studentsExamDetail model

const fetchAnswersExcludingUser = async ( userId, questionId ) => {
  try {
    const answers = await studentsExamDetail.findAll({
      where: {
        examQuestionId: questionId,

        [Sequelize.Op.not]: [
          { '$studentsExamAnswer.UserinformationId$': userId }
        ]
      },
      include: [{
        model: studentsExamAnswer,
      }]
    });
    return  answers;
  } catch (error) {
    console.error("Error fetching answers:", error);
    throw error; 
  }
};


module.exports = fetchAnswersExcludingUser;
