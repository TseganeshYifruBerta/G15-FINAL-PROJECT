const User = require('../../../models/auth/user.model');
const SubmittedExamAnswer = require('../../../models/exam/studentsExamAnswer');
const section = require('../../../models/auth/section.model');
const SelectedSectionsForExam = require('../../../models/exam/SelectedSectionsForExam');
const submitExamAnswerByStudent = require('../../../models/exam/submittedExamDetail');
const ExamQuestion = require("../../../models/exam/uploadExamQuestion")
const getAllExamtakeStudent = async (req, res) => {
    const { examId , teacherId } = req.params;
    try {

        const ExamTakeUser = await SubmittedExamAnswer.findAll({
            where: { 
                examId: examId 
            },
            group: ['Userinformation.id'] ,
            include: [{
                model: User,
                as: 'Userinformation',
                
               include  : [{    
                model:section,   
                as: 'SectionsOfUser'
            
            }],
            

            }],
            
        });
        

     const teacher = await User.findOne({

         where: {
            id: teacherId
        },
        include: {
            model: section,
            as: 'SectionsOfUser'}

    
     } );  
    const users = ExamTakeUser.map(examTake => examTake.Userinformation);
      
     const teacherSectionList = teacher.SectionsOfUser.map(section => section.section);
     console.log(teacherSectionList);

    const filterUser = users.filter(examTake => teacherSectionList.includes(examTake.SectionsOfUser[0].section));
    console.log(filterUser);
    
        res.status(200).json({filterUser,examId});
    } catch (error) {
        console.error('Failed to fetch exams:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const getSubmissionOfstudentByQuestionId = async (req, res) => {
    const { userId, questionId } = req.params;

    try {
        const foundUser = await User.findOne({
            where: {
                id: userId
            }
        });
        if(!foundUser) return res.status(404).json({ message: 'User not found' });
        const questionDetail = await ExamQuestion.findOne({
            where:{
                id:questionId
            }
        })

        const submission = await SubmittedExamAnswer.findAll({
            where: {
                UserinformationId: userId,
            },
            include: [
                {
                    model: submitExamAnswerByStudent,
                    as: 'studentsExamDetails',
                    where: {
                        examQuestionId: questionId
                    }
                },
                
            ]
            
        });
        const response = submission[0].studentsExamDetails[0].submittedAnswer
        const submittedDate = submission[0].studentsExamDetails[0].createdAt
        return res.status(200).json({response,questionDetail,submittedDate})
    } catch (error) {
        console.error('Failed to fetch exams:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getAllExamtakeStudent, getSubmissionOfstudentByQuestionId }
