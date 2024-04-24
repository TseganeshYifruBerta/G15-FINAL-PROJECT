const Exam = require("../../models/exam/createExam")
const User = require("../../models/auth/user.model");
const Allplagiarism = require("../../models/plagiarism/allPlagiarism");
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

     
       let final = []
       let exams = []
      if(!endedExams){
         exams = []
      }
      else{
        const examFound = endedExams.map((exam) => ({examId:exam.id,examtitle:exam.title}));
        // return res.status(200).json({exams: examFound});
        for(const examId of examFound){
          const examData = await Allplagiarism.findOne({
            where: {
                examId: examId.examId, 
            },
        });
        // return res.status(200).json({exams: examData});
        if(examData === null){
          exams.push({
            id: examId.examId,
            title: examId.examtitle,

          });
        }
        
      
        }
        
      }

      return res.status(200).json({exams: exams});
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  module.exports = getAllEndedExams
