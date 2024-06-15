const plagiarismSection = require("../../models/plagiarism/plagiarizedSection.model");
const Allplagiarism = require("../../models/plagiarism/allPlagiarism");
const User = require("../../models/auth/user.model");
const Section = require("../../models/auth/section.model");
const Sequelize = require('sequelize');
const ExamQuestion = require("../../models/exam/uploadExamQuestion");

const fetchAllPlagiarizedSections = async (req, res) => {
    try {
        const { examId, studentId, questionId } = req.params;

        // Fetch the plagiarism ratio for the specific question
        const examQuestion = await ExamQuestion.findOne({
            where: { id: questionId },
            attributes: ['plagiarismRatio']
        });

        if (!examQuestion) {
            return res.status(404).json({ message: "Question not found" });
        }

        const plagiarismRatio = (examQuestion.plagiarismRatio / 100);

        // Fetch all plagiarism records that meet the criteria
        const allPlagiarismFound = await Allplagiarism.findAll({
            where: {
                examId: examId,
                userId: studentId,
                question: questionId,
                percentage: {
                    [Sequelize.Op.gte]: plagiarismRatio
                }
            },
            include: [{
                model: plagiarismSection,
                as: "plagiarismSectionId"
            }]
        });

        if (allPlagiarismFound.length === 0) {
            return res.status(404).json({ message: "No submissions found for this question" });
        }

        // Fetch user and section information for each plagiarism record
        const AllStudentsAndTaggedCode = await Promise.all(allPlagiarismFound.map(async (item) => {
            const otherUser = await User.findOne({
                where: { id: item.otherUserId },
                attributes: ['fullName'],
                include: [
                    {
                        model: Section,
                        as: "SectionsOfUser",
                        attributes: ['section']
                    }
                ]
            });

            return { ...item.toJSON(), newUser: otherUser };
        }));

        return res.status(200).json({ AllStudentsAndTaggedCode });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = fetchAllPlagiarizedSections;
