const Exam = require("../../../models/exam/createExam");
const jwt = require('jsonwebtoken')
const ExamQuestionId = require("../../../models/exam/SelectedQuestionForExam");
const ExamQuestion= require("../../../models/exam/uploadExamQuestion");
const SelectedSectionsForExam = require("../../../models/exam/SelectedSectionsForExam");
const { model } = require("../../../database/sequelize");
const SelectedChapter = require("../../../models/exam/SelectedChapter");
const User = require("../../../models/auth/user.model");
// Function to get an exam by ID along with associated questions
const getExamByIdWithQuestions = async (req, res) => {
    try {
        const { examId ,studentId } = req.params; // The exam's ID
        const exam = await Exam.findByPk(examId);
        
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found.' });
        }

        // Assuming exam.questionIds is an array of question IDs. If it's a string, you'll need to split it.
        const ExamWithquestionIds = await Exam.findAll({
          where: { id: examId },

          include : [{
            model: ExamQuestionId,
            as: "selectedQuestionsForExam",
            attributes: ["question_ids"],
            
          },
          
          {
          model:SelectedSectionsForExam,
            as: "selectedSectionsForExam",

       
         },
         {
         model:SelectedChapter,
            as:"selectedChapters",},
        
      
        
        ],
        }); // Or exam.questionIds.split(',') for a comma-separated string.
        const questionId = ExamWithquestionIds.map((question) => question.selectedQuestionsForExam.map((q)=>q.question_ids));
        

        // Fetch questions using the IDs retrieved from the exam
        const questions = await Promise.all(questionId.flat().map(async (id) => {
            return await ExamQuestion.findByPk(id);
        }));
        // Filter out any null vaylues in case some questions were not found
        const filteredQuestions = questions.filter(question => question !== null);
        // Combine exam details with the questions
        const response = {
            ...exam.toJSON(),
            chapters: ExamWithquestionIds[0].selectedChapters,
            questions: filteredQuestions,
            sections: ExamWithquestionIds[0].selectedSectionsForExam,
           
        };


        return res.status(200).json({response});
    } catch (error) {
        console.error('Failed to fetch exam with questions:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};



const getExamDetailByIdStudentView = async (req, res) => {
    try {
       
        const {
            passKey,
            examId,
            studentId
        } = req.params;
        // The exam's ID
        const exam = await Exam.findAll({
            where: {
                id: examId
            }
        });
       

        

        const student = await User.findAll({
            where: {
                id: studentId
            }
        });
        
        
        if (!exam || !student) {
            return res.status(404).json({ message: 'Exam not found or Student not found' });
        }
        // const pk = await exam.passKey;
        // console.log(pk,"-------------------------------------");
        if  (exam[0].passKey != passKey){
            return res.status(401).json({ message: "Invalid passkey" });
        }
        // Assuming exam.questionIds is an array of question IDs. If it's a string, you'll need to split it.
        const ExamWithquestionIds = await Exam.findAll({
          where: { id: examId },

          include : [{
            model: ExamQuestionId,
            as: "selectedQuestionsForExam",
            attributes: ["question_ids"],
            
          },
          
          {
          model:SelectedSectionsForExam,
            as: "selectedSectionsForExam",

       
         },
         {
         model:SelectedChapter,
            as:"selectedChapters",},
        
      
        
        ],
        }); // Or exam.questionIds.split(',') for a comma-separated string.
        const questionId = ExamWithquestionIds.map((question) => question.selectedQuestionsForExam.map((q)=>q.question_ids));
        

        // Fetch questions using the IDs retrieved from the exam
        const questions = await Promise.all(questionId.flat().map(async (id) => {
            return await ExamQuestion.findByPk(id);
        }));
        // Filter out any null vaylues in case some questions were not found
        const filteredQuestions = questions.filter(question => question !== null);
        // Combine exam details with the questions
        const response = {
            exam: exam,
            chapters: ExamWithquestionIds[0].selectedChapters,
            questions: filteredQuestions,
            sections: ExamWithquestionIds[0].selectedSectionsForExam,
           
        };
        return res.status(200).json({response});

    }
        catch (error) {
            console.error('Failed to fetch exam with questions:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }



  module.exports = { getExamByIdWithQuestions, getExamDetailByIdStudentView};

