const User = require("../../models/auth/user.model");
const Section = require("../../models/auth/section.model");
const ExamQuestion = require("../../models/exam/uploadExamQuestion");
const gradeResult = require("../../models/grading/grading");
const criteria = require("../../models/grading/criteria");

const fetchGradeResultByStudentId = async (req, res) => {
    try {
        const { examId, studentId } = req.params;

        // Fetch graded results
        const allGradedResult = await gradeResult.findAll({
            where: { 
                examId: examId,
                studentId: studentId,
            },
            attributes: ['examQuestionId', 'finalGrade'],
        });

        if (allGradedResult.length === 0) {
            return res.status(400).json({ message: "No graded result found" });
        }

        // Fetch question details using examQuestionId from allGradedResult
        const fetchQuestionDetailsPromises = allGradedResult.map(result =>
            ExamQuestion.findByPk(result.examQuestionId, {
                attributes: ['id', 'title'] // Add other attributes you need
            })
        );
        const fetchCriteriaDetailsPromises = allGradedResult.map(result =>
            criteria.findOne({
                where: { examQuestionId: result.examQuestionId },
                attributes: ['gradeValue'] // Add other attributes you need
            })

        );

        

        const questionDetails = await Promise.all(fetchQuestionDetailsPromises);
        const criteriaDetails = await Promise.all(fetchCriteriaDetailsPromises);



        // Combine the graded results with the question details
        const combinedResults = allGradedResult.map((result, index) => ({
            ...result.toJSON(),
            questionDetails: questionDetails[index],
            criteriaDetails: criteriaDetails[index]
        }));
        const totalFinalGrade = combinedResults.reduce((sum, result) => sum + parseFloat(result.finalGrade), 0);
        
        return res.status(200).json({ combinedResults , totalFinalGrade});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = fetchGradeResultByStudentId;
