const CreatExam = require('../../../models/exam/createExam'); // Adjust the path as necessary
const SelectedQuestionForExam = require('../../../models/exam/SelectedQuestionForExam'); 
const SelectedSectionsForExam = require('../../../models/exam/SelectedSectionsForExam');
const ExamQuestion = require('../../../models/exam/uploadExamQuestion');


          // get all created Exam
const getAllCreatedExams = async (req, res) => {
  try {
    const exams = await CreatExam.findAll({
      include: [
        {
          model: SelectedQuestionForExam,
          as: 'selectedQuestionsForExam',
        },
        {
          model: SelectedSectionsForExam,
          as: 'selectedSectionsForExam',
        }
      ]
    });

    // Iterate over exams and fetch questions for each question ID
    for (const exam of exams) {
      for (const selectedQuestion of exam.selectedQuestionsForExam) {
        const questionId = selectedQuestion.question_ids;
        const question = await ExamQuestion.findByPk(questionId);
        selectedQuestion.dataValues.question = question; // Attach the fetched question directly to the selectedQuestion object
      }
    }
    
    res.status(200).json({ exams });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
          

// Controller to get an exam by ID
const getAllCreatedExamByTeacherId = async (req, res) => {
  try {
    const {  teacherId } = req.params; // Get the ID from the request parameters

    const exam = await CreatExam.findAll({
      where: {
        teacherId: teacherId
      }
    });

    if (!exam) {
      res.status(404).send('Exam not found');
    }

    const exams = await CreatExam.findAll({
      include: [
        {
          model: SelectedQuestionForExam,
          as: 'selectedQuestionsForExam',
        },
        {
          model: SelectedSectionsForExam,
          as: 'selectedSectionsForExam',
        }
      ]
    });

    // Iterate over exams and fetch questions for each question ID
    for (const exam of exams) {
      for (const selectedQuestion of exam.selectedQuestionsForExam) {
        const questionId = selectedQuestion.question_ids;
        const question = await ExamQuestion.findByPk(questionId);
        selectedQuestion.dataValues.question = question; // Attach the fetched question directly to the selectedQuestion object
      }
    }
    

    res.status(200).json({ exams  });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllCreatedExams,
  getAllCreatedExamByTeacherId
};
