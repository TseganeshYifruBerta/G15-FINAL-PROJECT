const Exam = require("../../models/exam/createExam")
const User = require("../../models/auth/user.model")
const getAllEndedExams = async (req, res) => {
    try {
      const {teacherId} = req.params;
      const userFound = await User.findOne({
        where: {
            id: teacherId,
            role: "teacher"
        }
    });
    if (!userFound) {
        return res.status(400).json({ message: "User is not found" });
    }


      const endedExams = await Exam.findAll({
        where: {
          
          status: "end",
        },
      });

       let exams = []
      if(!endedExams){
         exams = []
      }
      else{
        exams = endedExams.map((exam) => ({
                id: exam.id, // Including the exam ID
                title: exam.title // Including the exam title
            }));
      }

      return res.status(200).json({exams: exams});
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  module.exports = getAllEndedExams
