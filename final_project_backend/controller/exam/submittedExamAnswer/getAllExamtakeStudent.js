const User = require('../../../models/auth/user.model');
const SubmittedExamAnswer = require('../../../models/exam/studentsExamAnswer');
const section = require('../../../models/auth/section.model');
const SelectedSectionsForExam = require('../../../models/exam/SelectedSectionsForExam');

const getAllExamtakeStudent = async (req, res) => {
    const { examId , teacherId } = req.params;
    try {


        const ExamTakeUser = await SubmittedExamAnswer.findAll({
            where: { 
                examId: examId 
                
            
            },
            include: [{
                model: User,
                as: 'Userinformation',
               include  : [{    
                model:section,   
                as: 'SectionsOfUser'
            
            }]

            }]
        });
        

     const teacher = await User.findOne({

         where: {
            id: teacherId
        },
        include: [{
            model: section,
            as: 'SectionsOfUser'}]

    
     } );  
    const users = ExamTakeUser.map(examTake => examTake.Userinformation);
      
     const teacherSectionList = teacher.SectionsOfUser.map(section => section.section);
     console.log(teacherSectionList);

    const filterUser = users.filter(examTake => teacherSectionList.includes(examTake.SectionsOfUser[0].section));
    console.log(filterUser);
        res.status(200).json(filterUser);
    } catch (error) {
        console.error('Failed to fetch exams:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = getAllExamtakeStudent