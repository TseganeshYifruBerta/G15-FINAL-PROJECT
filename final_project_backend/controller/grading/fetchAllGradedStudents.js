const User = require("../../models/auth/user.model");
const Section = require("../../models/auth/section.model");
const ExamQuestion = require("../../models/exam/uploadExamQuestion");
const gradeResult = require("../../models/grading/grading");

const fetchAllGradedStudents = async (req, res) => {
    try {
        const { examId } = req.params;

        // Fetch distinct studentId from gradeResult
        const allGradedStudentsRecords = await gradeResult.findAll({
            where: { examId: examId },
            attributes: ['studentId'],
            group: ['studentId']
        });

        if (!allGradedStudentsRecords.length) {
            return res.status(404).json({ message: "No graded exam found with this exam id" });
        }

        // Fetch user details for each distinct studentId
        const allGradedStudents = await Promise.all(allGradedStudentsRecords.map(async (record) => {
            const student = await User.findOne({
                where: { id: record.studentId },
                attributes: ['id', 'fullName', 'email','createdAt','status','userId'], // Add other necessary attributes here
                include: [
                    {
                        model: Section,
                        as: "SectionsOfUser",
                        attributes: ['section']
                    }
                ]
            });

            return student;
        }));

        return res.status(200).json({ allGradedStudents });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = fetchAllGradedStudents;
