const Question = require("../../models/question_testcase_submission/question");
const TestCase = require('../../models/question_testcase_submission/testCase')
const User = require('../../models/auth/user.model')
const sequelize = require("../../database/sequelize");

const submitQuestionWithTestCases = async (req, res) => {
  const { title, difficulty, description, example, testCases, teacherId, functionName } = req.body;

  try {
    transaction = await sequelize.transaction();
    const teacherDetail = await User.findOne({
      where: {
        id: teacherId
      },
      transaction
    })
    if(!teacherDetail){
      return res.status(200).json({message:"The user is not found"})
    }
    if (teacherDetail.status === 'active') {
      // Create a new LabQuestion
      const newQuestion = await Question.create({
        title,
        difficulty,
        description,
        example,
        teacherId,
        functionName,
      }, {
        transaction
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

            input: formattedInput,


            output: formattedOutput,
            labQuestionId: newQuestion.id, // Associate the test case with the new LabQuestion
          }, { transaction });
        })
      );
      await transaction.commit();

      res.status(201).json({
        message: "Question and test cases submitted successfully",
        question: newQuestion,
        testCases: createdTestCases,
      });

    }
    else {
      res.status(403).json({ message: "The user account is not activated", })
    }

  } catch (error) {
    await transaction.rollback();
    res
      .status(500)
      .json({
        message: "Error submitting question and test cases",
        error: error.message,
      });
  }
};
module.exports = { submitQuestionWithTestCases };


