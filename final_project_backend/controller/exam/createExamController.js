const Exam = require("../../models/exam/createExam");
const ExamQuestion = require("../../models/exam/examQuestion");
const { Op } = require("sequelize");

async function createExam(req, res) {
  try {
    const { title, date_and_time, instructions, easy_questions, medium_questions, hard_questions } = req.body;

    // Retrieve the exam questions from the database where they are stored
    const examQuestions = await ExamQuestion.findAll({
      where: {
        difficulty: {
          [Op.or]: ["easy", "medium", "hard"],
        },
      },
    });

    // Shuffle the exam questions randomly
    const shuffledQuestions = shuffleArray(examQuestions);

    const filteredQuestions = {
      easy: shuffledQuestions.filter((question) => question.difficulty === "easy").slice(0, easy_question_count),
      medium: shuffledQuestions.filter((question) => question.difficulty === "medium").slice(0, medium_question_count),
      hard: shuffledQuestions.filter((question) => question.difficulty === "hard").slice(0, hard_question_count),
    };

    const selectedQuestions = [

      ...filteredQuestions.easy.map((question) => question.id),
      ...filteredQuestions.medium.map((question) => question.id),
      ...filteredQuestions.hard.map((question) => question.id),
    ];
    // Create the exam in the database
    const exam = await Exam.create({
      title,
      date_and_time,
      instructions,
      question_ids : selectedQuestions,
    });
    res.status(201).json({ message: "Exam created successfully", exam });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create exam" });
  }
}
module.exports = createExam;
