const studentsExamAnswer = require("../../models/exam/studentsExamAnswer");

const studentsExamDetail = require("../../models/exam/submittedExamDetail"); // Import the studentsExamDetail model

const fetchStudentExamAnswerById = async (userId, questionId) => {
    try {
        const answers = await studentsExamDetail.findAll({
            where: {
                examQuestionId: questionId,
            },
            include: [{
                model: studentsExamAnswer,
                where: {
                    
                    UserinformationId: userId,


                },
            }]
        });
        return  answers ;
    } catch (error) {
        console.error("Error fetching answers:", error);
        throw error;
    }
};


module.exports = fetchStudentExamAnswerById;
