const Question = require("../../models/question_testcase_submission/question");
const Status = require("../../models/codeSubmision/codeStatus");
const User = require("../../models/auth/user.model");
const Sequelize = require("../../database/sequelize");
const TestCase = require("../../models/question_testcase_submission/testCase");
const DetailofQuestion = async (req, res) => {
    const { questionId  } = req.params;
    
    try {
        const questionDetail = await Question.findOne({ 
            where: {
                id: questionId,
            },
            include: [
            {
                model: TestCase,
                as: 'TestCases',
                where: {
                    labQuestionId: questionId,
                },
                attribute:["input","output"],
            },
            ],
            
        });
        const submittedBy = await Status.findAll({
            where: {
                questionId: questionId,
                status: "Accepted",
            },
           
        });
        const userIds = submittedBy.map((userId) => userId.userId);

        const users = await User.findAll({
            where: {
                id: userIds,
            },
            attributes: ["id", "fullName"],
        });

        const detail = {
            questionDetail,
            submittedBy: users,
        };

        return res.status(200).json(detail);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
module.exports = DetailofQuestion;