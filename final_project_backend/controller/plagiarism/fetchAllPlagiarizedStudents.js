const Allplagiarism = require("../../models/plagiarism/allPlagiarism");
const User = require("../../models/auth/user.model");
const Section = require("../../models/auth/section.model");
const ExamQuestion = require("../../models/exam/uploadExamQuestion");

const fetchAllPlagiarizedStudents = async (req, res) => {
    try {
        const { examId } = req.params;

        // Fetch all plagiarism records for the given examId
        const allPlagiarismRecords = await Allplagiarism.findAll({
            where: { examId: examId },
            attributes: ['userId', 'question', 'percentage']
        });

        if (!allPlagiarismRecords.length) {
            return res.status(404).json({ message: "No plagiarism checked exam found with this exam id" });
        }

        // Filter records based on plagiarism ratio for each question
        const filteredRecords = await Promise.all(allPlagiarismRecords.map(async (record) => {
            const examQuestion = await ExamQuestion.findOne({
                where: { id: record.question },
                attributes: ['plagiarismRatio']
            });
            

            return record.percentage >= ((examQuestion.plagiarismRatio)/100) ? record : null;
        }));

        // Remove null entries
        const validRecords = filteredRecords.filter(record => record !== null);

        // Get distinct userIds from the filtered records
        const distinctUserIds = [...new Set(validRecords.map(record => record.userId))];

        // Fetch user details for each distinct userId
        const AllPlagiarizedStudents = await Promise.all(distinctUserIds.map(async (userId) => {
            const user = await User.findOne({
                where: { id: userId },
                include: [
                    {
                        model: Section,
                        as: "SectionsOfUser",
                        attributes: ['section']
                    }
                ]
            });

            return { userId: userId, newUser: user };
        }));

        return res.status(200).json({ AllPlagiarizedStudents });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = fetchAllPlagiarizedStudents;
