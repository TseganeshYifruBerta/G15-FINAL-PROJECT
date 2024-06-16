const User = require("../../models/auth/user.model");
const Section = require("../../models/auth/section.model");
const ExamQuestion = require("../../models/exam/uploadExamQuestion");
const gradeResult = require("../../models/grading/grading");

const fetchGradedResult = async (req, res) => {
    try {
        const { examId , studentId , questionId } = req.params;

        // Fetch distinct studentId from gradeResult
        const allGradedResult = await gradeResult.findAll({
            where: { 
                examId: examId,
                studentId: studentId,
                examQuestionId: questionId
             },
           
        });



        return res.status(200).json({ allGradedResult });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = fetchGradedResult;
