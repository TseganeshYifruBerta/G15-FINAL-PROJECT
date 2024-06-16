const ExamQuestion = require("../../models/exam/uploadExamQuestion");
const Allplagiarism = require("../../models/plagiarism/allPlagiarism");

const fetchListOfQuestionsByExamId = async (req, res) => {
    try {
        const { examId, studentId } = req.params;

        const examFound = await Allplagiarism.findOne({
            where: {
                examId: examId,
                userId: studentId
            }
        });

        if (!examFound) {
            return res.status(400).json({ message: "The Exam has not been checked for plagiarism" });
        }

        const allPlagiarismRecords = await Allplagiarism.findAll({
            where: {
                examId: examId,
                userId: studentId
            },
            attributes: ['question', 'percentage']
        });

        if (!allPlagiarismRecords.length) {
            return res.status(404).json({ message: "No plagiarism checked exam found with this exam id" });
        }

        const filteredQuestions = await Promise.all(allPlagiarismRecords.map(async (record) => {
            const examQuestion = await ExamQuestion.findOne({
                where: { id: record.question },
                attributes: ['id', 'plagiarismRatio', 'title', 'description','difficulty','tag','chapter','createdAt']
            });

            return record.percentage >= (examQuestion.plagiarismRatio / 100) ? examQuestion : null;
        }));

        const distinctQuestions = [...new Set(filteredQuestions.filter(question => question !== null))];

        if (!distinctQuestions.length) {
            return res.status(404).json({ plagiarizedQuestions: [] });
        }

        return res.status(200).json({ plagiarizedQuestions: distinctQuestions });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = fetchListOfQuestionsByExamId;
