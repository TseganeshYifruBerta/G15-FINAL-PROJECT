const  Question  = require("../../models/question_testcase_submission/question");
const TestCase = require('../../models/question_testcase_submission/testCase')
const User = require('../../models/auth/user.model')
// Controller function to submit a question along with its test cases
const submitQuestionWithTestCases = async (req, res) => {
const { title, difficulty, description, example, testCases ,teacherId} = req.body;

  try {
    const teacherDetail = await User.findOne({
      where: {
        id : teacherId
      }
    })
    if(teacherDetail.status === 'active'){
      // Create a new LabQuestion
    const newQuestion = await Question.create({
      title,
      difficulty,
      description,
      example,
      teacherId
    });


    const createdTestCases = await Promise.all(
      testCases.map(async (testCase) => {
        const formattedOutput = Array.isArray(testCase.output
          )
          ? testCase.output
          : [testCase.output]; // Ensure output is an array
          const formattedInput = Array.isArray(testCase.input)
            ? testCase.input
            : [testCase.input]; 
        return await TestCase.create({
          // nums: testCase.input.nums,
          // target: testCase.input.target,
          
          input:formattedInput,


          output: formattedOutput,
          labQuestionId: newQuestion.id, // Associate the test case with the new LabQuestion
        });
      })
    );
   
    res.status(201).json({
      message: "Question and test cases submitted successfully",
      question: newQuestion,
      testCases: createdTestCases,
    });

    }
    else{
      res.status(403).json({message: "The user account is not activated",})
    }
    
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error submitting question and test cases",
        error: error.message,
      });
  }
};
module.exports = { submitQuestionWithTestCases };


