const Question = require("../../../models/question_testcase_submission/question")
const TestCase = require("../../../models/question_testcase_submission/testCase")
const User = require("../../../models/auth/user.model")
const sequelize = require("../../../database/sequelize")
const editQuestion = async (req, res) => {
    try {
      const { title, difficulty, description, example, testcases , functionName} = req.body;
      const { id ,teacherId} = req.params;

      const question = await Question.findByPk(id);
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
      const questionByTeacher = await Question.findOne({
        where:{
          id:id,
          teacherId:teacherId
        }
      })

      if (!questionByTeacher) {
        return res.status(404).json({ message: "You are not a privileged teacher to edit this question." });
      }
      const teacherStatus = await User.findOne({
        where:{
          id:teacherId
        }
      })

      if (teacherStatus.status === "active" ){
      
      
  
      // Start a transaction
      const transaction = await sequelize.transaction();
  
      try {
  
        question.title = title;
        question.difficulty = difficulty;
        question.description = description;
        question.example = example;
        question.functionName = functionName;
        await question.save({ transaction });
  
  
        if (testcases) {
          await Promise.all(
            testcases.map(async (testCase) => {
              const formattedOutput = Array.isArray(testCase.output)
                ? testCase.output
                : [testCase.output]; // Ensure output is an array
              const formattedInput = Array.isArray(testCase.input)
                ? testCase.input
                : [testCase.input];
              const testcaseId = testCase.id;
  
              await TestCase.update(
                { input: formattedInput, output: formattedOutput },
                { where: { labQuestionId: id, id: testcaseId }, transaction }
              );
            })
          );
        }
        
  
        // // Check if the section data is provided
    
  
        // Commit the transaction
        await transaction.commit();
        const updatedTestCases = await TestCase.findAll({ where: { labQuestionId: id } });

  
        return res.status(200).json({ message: "Question updated successfully"  , question,updatedTestCases});
      } catch (error) {
        // Rollback the transaction if there's an error
        await transaction.rollback();
        console.error(error);
        return res.status(500).json({ error: "Failed to update question" });
      }
    }
      else{
        res.status(403).json({ message: "The user is not activated" })
      }
    }
    catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });}}
  
  module.exports = 
    editQuestion

