const CreatExam = require('../../../models/exam/createExam');
const SelectedQuestionForExam = require('../../../models/exam/SelectedQuestionForExam');
const SelectedSectionsForExam = require('../../../models/exam/SelectedSectionsForExam');
const ExamQuestion = require('../../../models/exam/uploadExamQuestion');
const sequelize = require('../../../database/sequelize'); // Import sequelize instance

const fetchDetailOfCreatedExamById = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { examId } = req.params;

    // Fetch the exam details by its ID
    const exam = await CreatExam.findOne({
      where: {
        id: examId
      },
      transaction // Pass the transaction to the query
    });

    if (!exam) {
      await transaction.rollback(); // Rollback the transaction
      return res.status(404).send('Exam not found');
    }

    // Include associated models to fetch related data
    const exams = await CreatExam.findOne({
      where: {
        id: examId
      },
      include: [
        {
          model: SelectedQuestionForExam,
          as: 'selectedQuestionsForExam',
        },
        {
          model: SelectedSectionsForExam,
          as: 'selectedSectionsForExam',
        }
      ],
      transaction // Pass the transaction to the query
    });

    // Iterate over selectedQuestionsForExam and attach associated questions
    for (const selectedQuestion of exams.selectedQuestionsForExam) {
      const questionId = selectedQuestion.question_ids;
      const question = await ExamQuestion.findByPk(questionId, { transaction }); // Pass the transaction to the query
      selectedQuestion.dataValues.question = question;
    }

    // Commit the transaction
    await transaction.commit();

    // Send the response with the exam details
    res.status(200).json({ exam: exams });
  } catch (error) {
    await transaction.rollback(); // Rollback the transaction in case of error
    res.status(500).send(error.message);
  }
};

module.exports = fetchDetailOfCreatedExamById;
