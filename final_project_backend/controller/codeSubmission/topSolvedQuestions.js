const Status = require('../../models/codeSubmision/codeStatus'); // Import your Sequelize model
const sequelize = require('sequelize');
const Question = require('../../models/question_testcase_submission/question');


const fetchTopSolvedQuestions = async (req, res) => {
    try {
        const topSolvedQuestions = await Status.findAll({
            attributes: [
                'questionId',
                [sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.col('UserinformationId'))), 'userCount']
            ],
            where: {
                status: 'accepted'
            },
            group: ['questionId'],
            order: [[sequelize.literal('userCount'), 'DESC']],
            limit: 10,
        });

        const questionIds = topSolvedQuestions.map(question => question.questionId);

        const questionDetailsPromises = questionIds.map(async (questionId) => {
            const question = await Question.findOne({
                where: {
                    id: questionId
                }
            });
            return question ? question.dataValues : null;
        });

        const questionDetails = await Promise.all(questionDetailsPromises);

        const combinedResults = topSolvedQuestions.map((topSolvedQuestion, index) => ({
            userCount: topSolvedQuestion.dataValues.userCount,
            questionId: topSolvedQuestion.questionId,
            questionDetail: questionDetails[index] 
        }));

        return res.status(200).json({ combinedResults });
    } catch (error) {
        console.error("Error fetching top solved questions:", error);
        res.status(500).json({ message: 'Failed to fetch top solved questions' });
    }
};


module.exports = fetchTopSolvedQuestions

