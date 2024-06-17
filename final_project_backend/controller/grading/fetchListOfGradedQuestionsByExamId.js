const ExamQuestion = require("../../models/exam/uploadExamQuestion");
const gradeResult = require("../../models/grading/grading");
const Allplagiarism = require("../../models/plagiarism/allPlagiarism");

const fetchListOfGradedQuestionsByExamId = async (req, res) => {
    try {
        const { examId, studentId } = req.params;

        // Check if the exam has been graded for the specific student
        const examFound = await gradeResult.findOne({
            where: {
                examId: examId,
                studentId: studentId
            }
        });

        if (!examFound) {
            return res.status(400).json({ message: "The Exam has not been Graded" });
        }

        // Fetch distinct question IDs from the gradeResult table for the specific exam and student
        const gradedQuestions = await gradeResult.findAll({
            where: {
                examId: examId,
                studentId: studentId
            },
            attributes: ['examQuestionId'],
            group: ['examQuestionId']
        });

        const questionIds = gradedQuestions.map(question => question.examQuestionId);

        // Fetch details of each question
        const allQuestionData = await Promise.all(questionIds.map(async (id) => {
            const question = await ExamQuestion.findOne({
                where: { id: id }
            });
            return question;
        }));

        return res.status(200).json({ allQuestionData });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = fetchListOfGradedQuestionsByExamId;
