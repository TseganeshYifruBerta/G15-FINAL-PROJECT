const Allplagiarism = require("../../models/plagiarism/allPlagiarism");
const User = require("../../models/auth/user.model");
const Section = require("../../models/auth/section.model");

const fetchAllPlagiarizedStudents = async (req, res) => {
    try {
        const { examId } = req.params;

        // Fetch distinct userId from PlagiarismCheckedExam
        const distinctUserIds = await Allplagiarism.findAll({
            where: { examId: examId },
            attributes: ['userId'],
            group: ['userId']
        });

        if (!distinctUserIds.length) {
            return res.status(404).json({ message: "No plagiarism checked exam found with this exam id" });
        }

        // Fetch user details for each distinct userId
        const AllPlagiarizedStudents = await Promise.all(distinctUserIds.map(async (item) => {
            const users = await User.findOne({
                where: { id: item.userId },
                attributes: ['fullName'],
                include: [
                    {
                        model: Section,
                        as: "SectionsOfUser",
                        attributes: ['section']
                    }
                ]
            });

            return { userId: item.userId, newUser: users };
        }));

        return res.status(200).json({ AllPlagiarizedStudents });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = fetchAllPlagiarizedStudents;
