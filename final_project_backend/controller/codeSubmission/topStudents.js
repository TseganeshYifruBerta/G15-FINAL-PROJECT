const { Op } = require('sequelize');
const Status = require('../../models/codeSubmision/codeStatus'); // Assuming your model file is in the same directory
const User = require('../../models/auth/user.model'); // Assuming your User model file is in the correct directory
const sequelize = require('../../database/sequelize');

const getTopStudents = async (req, res) => {
    try {
        // Find the top 5 students who have the most accepted statuses for each question
        const topStudents = await Status.findAll({
            attributes: ['UserinformationId', [sequelize.fn('COUNT', sequelize.literal('DISTINCT UserinformationId, questionId')), 'acceptedCount']],
            where: {
                status: 'accepted'
            },
            group: ['userId'],
            order: [[sequelize.literal('acceptedCount'), 'DESC']],
            limit: 5,
            include: [{
                model: User,
                attributes: ['fullName', 'email','userId'] // Include user details in the result
            }],
            raw: true // Get raw data instead of Sequelize model instances
        });

        // Send the response back to the client
        res.status(200).json({topStudents});
    } catch (error) {
        console.error('Error fetching top students:', error);
        res.status(500).json({message:'Internal Server Error'});
    }
}

module.exports = getTopStudents;
