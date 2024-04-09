const Question = require("../../../models/question_testcase_submission/question")
const TestCase = require("../../../models/question_testcase_submission/testCase")
const User = require("../../../models/auth/user.model")
const sequelize = require("../../../database/sequelize")

const editQuestion = async (req, res) => {
  const { title, difficulty, description, example, testcases, functionName } = req.body;
  const { id, teacherId } = req.params;
  const transaction = await sequelize.transaction();
  try {

    const question = await Question.findByPk(id);
    if (!question) {
      await t.rollback(); 
      return res.status(404).json({ success: false, message: 'Question not found' });
    }

    const questionByTeacher = await Question.findOne({
      where: {
        id: id,
        teacherId: teacherId
      }
    });

    if (!questionByTeacher) {
      return res.status(403).json({ success: false, message: "You are not authorized to edit this question." });
    }



      await Question.update(
        {title,difficulty,description,example,functionName },
        {where: {id:id} , transaction}
      )

      if (testcases) {
        await Promise.all(
          testcases.map(async (testCase) => {
            const formattedOutput = Array.isArray(testCase.output) ? testCase.output : [testCase.output];
            const formattedInput = Array.isArray(testCase.input) ? testCase.input : [testCase.input];
            const testcaseId = testCase.id;

            await TestCase.update(
              { input: formattedInput, output: formattedOutput },
              { where: { labQuestionId: id, id: testcaseId }, transaction }
            );
          })
        );
      }

      const updatedTestCases = await TestCase.findAll({ where: { labQuestionId: id } });
      
      await transaction.commit();
      
      const editedQuestion = await Question.findAll({
        where:{
          id:id
        },
        include:[
          {
            model: TestCase,
            as: "TestCases"
          }
        ]
      })

      return res.status(200).json({
        success: true,
        message: "Question updated successfully",
        editedQuestion : editedQuestion,
        updatedTestCases:updatedTestCases
      });
   
  } catch (error) {
    await transaction.rollback()
    console.error(error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};

module.exports = editQuestion;

  
  // module.exports = 
  //   editQuestion

