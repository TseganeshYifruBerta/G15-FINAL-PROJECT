const Exam = require("../../../models/exam/createExam");

const ExamQuestionId = require("../../../models/exam/SelectedQuestionForExam");
const ExamQuestion= require("../../../models/exam/uploadExamQuestion");
const selectedSectionsForExam = require("../../../models/exam/SelectedSectionsForExam");
const { model } = require("../../../database/sequelize");
const SelectedChapter = require("../../../models/exam/SelectedChapter");
// Function to get an exam by ID along with associated questions
const getExamByIdWithQuestions = async (req, res) => {
    try {
        const { id   } = req.params; // The exam's ID
        const exam = await Exam.findByPk(id);
        
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found.' });
        }

        // Assuming exam.questionIds is an array of question IDs. If it's a string, you'll need to split it.
        const ExamWithquestionIds = await Exam.findAll({
          where: { id: id },

          include : [{
            model: ExamQuestionId,
            as: "selectedQuestionsForExam",
            attributes: ["question_ids"],
            
          },
          
          {
          model:selectedSectionsForExam,
            as: "selectedSectionsForExam",
       
         },
         {
         model:SelectedChapter,
            as:"selectedChapters",}
        
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
            questions: filteredQuestions,
        };


        return res.status(200).json({response});
    } catch (error) {
        console.error('Failed to fetch exam with questions:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

  module.exports = getExamByIdWithQuestions;

