const Exam = require("../../models/exam/createExam")
const User = require("../../models/auth/user.model");
const Allplagiarism = require("../../models/plagiarism/allPlagiarism");
const { all } = require("axios");


const fetchStudentsFromPlagiarismCheckedExam = async (req, res) => {
    try {
        const { examId } = req.params;
        const examFound = await Allplagiarism.findOne({
            where: {
                examId: examId,
            },

        });
        if (!examFound) {
            return res.status(400).json({ message: "The Exam has not been checked for plagiarism" });
        }



        const AllStudents = await Allplagiarism.findAll({
            where: {
                examId: examId,

            },
            group: ['userId'],
        });
        const studentId = AllStudents.map(student => student.userId);
        let allStudentData = []
        for (const id of studentId) {
            const user = await User.findOne({
                where: {
                    id: id
                }
            });
           
            allStudentData.push(user);
        }
       






        return res.status(200).json({ allStudentData });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = fetchStudentsFromPlagiarismCheckedExam
