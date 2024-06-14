const ExamQuestion = require("../../../../models/exam/uploadExamQuestion");
const TestCase = require("../../../../models/exam/examTestcase");
const Solution = require("../../../../models/exam/solution");
const sequelize = require('../../../../database/sequelize');
const User = require("../../../../models/auth/user.model");
const { where } = require("sequelize");

const editExamQuestion = async (req, res) => {
  try {
    const { title, difficulty, description,  tag , chapter , example, testcases, solutions ,plagiarismRatio} = req.body;
    const { teacherId, examQuestionId } = req.params;

    const examQuestion = await ExamQuestion.findOne({
      where: {
        id: examQuestionId,
        teacherId: teacherId
      }
    });

    if (!examQuestion) {
      return res.status(404).json({ message: 'examQuestion not found' });
    }

    const foundUser = await User.findOne({  
      where: {
        id: teacherId
      }
    });
    if(!foundUser){ 
      return res.status(404).json({ message: 'User not found' });
    }

    // Start a transaction
    const transaction = await sequelize.transaction();

    try {
      // Update exam question
      examQuestion.title = title;
      examQuestion.difficulty = difficulty;
      examQuestion.description = description;
      examQuestion.example = example;
      examQuestion.tag = tag;
      examQuestion.chapter = chapter;
      examQuestion.plagiarismRatio = plagiarismRatio;
      await examQuestion.save({ transaction });

      // Update test cases
      if (testcases) {
        await Promise.all(
          testcases.map(async (testCase) => {
            // const formattedOutput = Array.isArray(testCase.output) ? testCase.output : [testCase.output];
            // const formattedInput = Array.isArray(testCase.input) ? testCase.input : [testCase.input];
            const testcaseId = testCase.id;

            await TestCase.update(
              { input: testCase.input, output: testCase.output },
              { where: { examQuestionId: examQuestionId, id: testcaseId }, transaction }
            );
          })
        );
      }

      // Update solutions
      if (solutions ) {
        await Promise.all(solutions.map(async (solution) => {
          const solutionId = solution.id;
          console.log("///////////",solutionId);
          console.log("///////////",solution.content);
          await Solution.update(
            { content: solution.content },
            { where: { examQuestionId: examQuestionId, id: solutionId}, transaction }
          );
        }));
      }

      // Commit the transaction
      await transaction.commit();

      // Fetch updated data
      const updatedExamQuestion = await ExamQuestion.findByPk(examQuestionId);
      const updatedTestCases = await TestCase.findAll({ where: { examQuestionId: examQuestionId } });
      const updatedSolution = await Solution.findAll({ where: { examQuestionId: examQuestionId } });

      return res.status(200).json({ examQuestion: updatedExamQuestion, testCases: updatedTestCases, solution: updatedSolution });
    } catch (error) {
      await transaction.rollback();
      console.error(error);
      return res.status(500).json({ message: 'Failed to update Exam Question' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


const addSolution = async (req, res) => {
  const { content , examQuestionId} = req.body;
 

  const examQuestion = await ExamQuestion.findOne({
    where: {
      id: examQuestionId,
    
    }
  });

  if (!examQuestion) {
    return res.status(404).json({ message: 'examQuestion not found' });
  }

  try {
    const solutions = Array.isArray(content) ? content : [content];

    const createdSolutions = await Promise.all(
      solutions.map(async (solution) => {
        const createdSolution = await Solution.create({
          content: solution,
          examQuestionId: examQuestionId,
        });
        return createdSolution;
      })
    );

    return res.status(201).json({ solutions: createdSolutions, message: 'solutions added' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to add solutions' });
  }
}

const deleteSolution = async (req, res) => {
  
  const { solutionId } = req.params;


  const examQuestion = await ExamQuestion.findOne({
    where: {
      id:solutionId
    }
  });



  const solution = await Solution.findOne({
    where: {
      id: solutionId,
   

    }
  
  })
  
  if (!solution) {
    return res.status(404).json({ message: 'solution not found' });
  }

  try {
    await solution.destroy();
    return res.status(200).json({message: 'solution deleted'});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to delete solution' });
  }
}

const AddTestcases = async (req, res) => {
  const { testCases ,examId } = req.body;


  try {
    const transaction = await sequelize.transaction();
    const examQuestion = await ExamQuestion.findOne(
     {  where: { 
      id: examId ,
      
    
    }
      }
      );
    if (!examQuestion) {
      return res.status(404).json({ message: 'Exam question not found' });
    }

    try {
      const createdTestCases = await Promise.all(
        testCases.map(async (testCase) => {
          // const formattedOutput = Array.isArray(testCase.output)
          //  ? testCase.output
          //   : [testCase.output];
          // const formattedInput = Array.isArray(testCase.input)
          //  ? testCase.input
          //   : [testCase.input];
          const createdTestCase = await TestCase.create({
            input: testCase.input,
            output: testCase.output,
            examQuestionId: examId
          }, { transaction });
          return createdTestCase;
        })
      );

      await transaction.commit();
      return res.status(201).json({ message: 'Test cases added successfully', testCases: createdTestCases });
    } catch (error) {
      await transaction.rollback();
      console.error(error);
      return res.status(500).json({ message: 'Failed to add test cases' });
    }
  
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

const DeleteTestcases = async (req, res) => {
  const { testCasesId } = req.params;

  try {
    const transaction = await sequelize.transaction();
    const testcaseFound = await TestCase.findOne({
      where: {
        id: testCasesId
      }
    });

    if (!testcaseFound) {
      return res.status(404).json({ message: 'Test case not found' });
    }

    try {
      await testcaseFound.destroy({ transaction });
      await transaction.commit();
      return res.status(200).json({ message: 'Test case deleted successfully' });
    } catch (error) {
      await transaction.rollback();
      console.error(error);
      return res.status(500).json({ message: 'Failed to delete test case' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}


module.exports = {editExamQuestion, addSolution , deleteSolution , AddTestcases , DeleteTestcases};
