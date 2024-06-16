const Exam = require("../../../models/exam/createExam")
const User = require("../../../models/auth/user.model");
const studentsExamAnswer = require("../../../models/exam/studentsExamAnswer");4
const SelectedSectionsForExam = require("../../../models/exam/SelectedSectionsForExam");
const Section = require("../../../models/auth/section.model");
const getAllExamsByStudentId = async (req, res) => {

    try {
      const {studentId} = req.params;
      const userWithSection = await User.findOne({
        where: { id: studentId 

        },

        include: [{
            model: Section, // Assuming you have a Section model that relates to the User
            as: 'SectionsOfUser' // Assuming 'section' is the association alias
        }]
    });
    console.log(userWithSection,"----------------------");
    if (userWithSection.role !== 'student') {
      return res.status(401).json({ message: "You are not a student" });
  }

    if (!userWithSection || !userWithSection.SectionsOfUser[0].section) {
        return res.status(404).json({ message: 'User or section not found' });
    }
    const exams = await Exam.findAll({
      include: [{
          model: SelectedSectionsForExam,
          as: 'selectedSectionsForExam',
          where: { sections: userWithSection.SectionsOfUser[0].section }
      }],
      // raw: true,
  });


    

    
    return res.status(200).json({exams, message: "All  exams for student"});


    } catch (error) { 
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  module.exports = getAllExamsByStudentId
