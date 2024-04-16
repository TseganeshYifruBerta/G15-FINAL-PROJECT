const studentsExamAnswer = require("../../models/exam/studentsExamAnswer");


const fetchStudentExamAnswerById = async (userId, questionId, examId) => {
    // const {userId, questionId, examId} = req.params;
    try {
        const answers = await studentsExamAnswer.findAll({
            where: {
                examQuestionId: questionId,
                examId: examId,
                UserinformationId: userId
            },
            
        });
        return  answers ;
        // return res.status(200).json({answers});
    } catch (error) {
        console.error("Error fetching answers:", error);
        throw error;
    }
};


module.exports = fetchStudentExamAnswerById;
