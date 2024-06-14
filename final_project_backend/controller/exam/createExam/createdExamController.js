const Exam = require("../../../models/exam/createExam");
const SelectedSectionsForExam = require("../../../models/exam/SelectedSectionsForExam");
const ExamQuestionId = require("../../../models/exam/SelectedQuestionForExam");
const User = require("../../../models/auth/user.model");
// const Exam = require("../../../models/exam/createExam");
const ExamQuestion = require("../../../models/exam/uploadExamQuestion");
const { Op } = require("sequelize");
const sequelize = require("../../../database/sequelize");
const SelectedChapter = require("../../../models/exam/SelectedChapter");


// The main function to handle exam creation
const createExam = async (req, res) => {
  const {
    title,
    examDate,
    examTime,
    instruction,
    sections,
    duration,
    tag,
    chapter,
    easy_questions,
    medium_questions,
    hard_questions,
    teacherId,
    passKey,


    
  } 
  = req.body;

  // Start a transaction
  const transaction = await sequelize.transaction();
  try {
        const foundUser = await User.findOne({
          where: {
            id: teacherId
          }
        });
    
        if (!foundUser) {
          return res.status(400).json({ message: "The user is not found" });
        }
    
        if (foundUser.status !== "active") {
          return res.status(403).json({ message: "The user is not active" });
        }




        const [easyQuestions, mediumQuestions, hardQuestions] = await Promise.all([
          ExamQuestion.findAll({
            where: { difficulty: 'easy', tag: tag, chapter: { [Op.in]: chapter } }
          }),
          ExamQuestion.findAll({
            where: { difficulty: 'medium', tag: tag, chapter: { [Op.in]: chapter } }
          }),
          ExamQuestion.findAll({
            where: { difficulty: 'hard', tag: tag, chapter: { [Op.in]: chapter } }
          })
        ]);
        const errors = [];
        if (easyQuestions.length < easy_questions) errors.push("insufficient easy questions");
        if (mediumQuestions.length < medium_questions) errors.push("insufficient medium questions");
        if (hardQuestions.length < hard_questions) errors.push("insufficient hard questions");
    
        if (errors.length > 0) {
          await transaction.rollback();
          return res.status(400).json({ message: errors.join(", ") });
        }
    
     





        function shuffleArray(array) {
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
        }
        async function selectedQuestionByTag(tag , chapter) {
           return ExamQuestion.findAll({
            where: {
              tag: tag,
              chapter: chapter.map(chapter => chapter)
            }
            
          });
        
        }
        
        const selectedTag = selectedQuestionByTag(tag , chapter);
        const selectedTagIds = (await selectedTag).map(question => question.id)

        const selectedQuestionsForExam = await ExamQuestion.findAll({

          where: {
           id: selectedTagIds.map(question => question)
           }
   
   
         })


        async function selectQuestionsByDifficulty(difficultyCount) {
        //   // Fetch all questions for each difficulty level
          const questionsByDifficulty = {
            easy:  selectedQuestionsForExam.filter(question => question.difficulty === 'easy'),
            medium:  selectedQuestionsForExam.filter(question => question.difficulty === 'medium'),
            hard:  selectedQuestionsForExam.filter(question => question.difficulty === 'hard'),
          };
        
          
        
        
          // Shuffle and slice questions for each difficulty to match the requested counts
          const selectedQuestions = {};
          Object.keys(questionsByDifficulty).forEach(difficulty => {
        
            const count = difficultyCount[difficulty]
            selectedQuestions[difficulty] = shuffleArray(questionsByDifficulty[difficulty])
              .slice(0, count)
              .map(question => question.id); // Selecting IDs of the selected questions
          });
        
          // Combine selected question IDs from all difficulties
          return [...selectedQuestions.easy, ...selectedQuestions.medium, ...selectedQuestions.hard];
        };
  
        // console.log(selectedTagIds);
        
      
          // Check if there are enough questions available for each difficulty level
        



    // Use the selectQuestions function to get a randomized selection of question IDs
    const selectedQuestionIds = await selectQuestionsByDifficulty({

      easy: easy_questions,
      medium: medium_questions,
      hard: hard_questions,

    });

    // Create exam within the transaction
    const exam = await Exam.create({
      title,
      examDate,
      examTime,
      passKey,
      
      instruction,
      duration,
      teacherId,
      tag,
      easy_questions,
      medium_questions,
      hard_questions,


    }, { transaction }); // Pass transaction to the create method

    if (sections && sections.length > 0) {
      await Promise.all(sections.map(async (section) => {
        await SelectedSectionsForExam.create({
          sections: section,
          examId: exam.id,
        }, { transaction }); // Pass transaction to the create method
      }));
    }

    if (chapter && chapter.length > 0) {
      await Promise.all(chapter.map(async (chapter) => {
        await SelectedChapter.create({
          chapter: chapter,
          examId: exam.id,
        }, { transaction }); // Pass transaction
      }
      ));
    }

    const questionAssociations = selectedQuestionIds.map(question_ids => ({
      question_ids,
      examId: exam.id,
    }));

    // Bulk create question associations within the transaction
    await ExamQuestionId.bulkCreate(questionAssociations, { transaction });

    // If everything was successful, commit the transaction
    await transaction.commit();

    res.status(201).json({
      message: "Exam created successfully",
      exam: exam,
      questionsIncluded: selectedQuestionIds,
      // selectedTag: questionsByDifficulty
    });
  } catch (error) {
    await transaction.rollback();
    // If there was any failure, rollback the transaction
    // await transaction.rollback();

    console.error(error);
    res.status(500).json({ message: "Failed to create exam" });
  }
}

module.exports = createExam;
