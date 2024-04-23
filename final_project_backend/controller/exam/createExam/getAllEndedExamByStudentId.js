const Exam = require("../../../models/exam/createExam")
const User = require("../../../models/auth/user.model");
const studentsExamAnswer = require("../../../models/exam/studentsExamAnswer");
const getAllEndedExamsByStudentId = async (req, res) => {

    try {
      const {studentId} = req.params;
      const userFound = await User.findOne({
        where: {
            id: studentId,
            role: "student"
        }
    });
    if (!userFound) {
        return res.status(400).json({ message: "User is not found" });
    }

    const endedExams = await Exam.findAll({
      where:{
        status: "end"
      }
    })

    const allExamId = endedExams.map((id)=>id.id)
    
    const AllCheckTakenExam = await studentsExamAnswer.findAll({
       group : ["examId"]
    });

    const checkTakenExam  = AllCheckTakenExam.map((id)=> id.examId)
    
    
    const missedExams = allExamId.filter((exam) => {
      return !checkTakenExam.some((takenExam) => takenExam == exam);
    });
    const labeledExams = endedExams.map((exam) => {
        if (missedExams.includes(exam.id)) {
          return {
            id: exam.id,
            title: exam.title,
            status: "missed",
          };
        } else {
          return {
            id: exam.id,
            title: exam.title,
            status: "Taken",
            result : "Not Graded"
          };
        }
      });

    
    return res.status(200).json(labeledExams);


    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  module.exports = getAllEndedExamsByStudentId
