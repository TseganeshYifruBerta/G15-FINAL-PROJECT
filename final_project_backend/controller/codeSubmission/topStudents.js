const { Op } = require('sequelize');
const Status = require('../../models/codeSubmision/codeStatus');
const User = require('../../models/auth/user.model');
const sequelize = require('../../database/sequelize');
const Section = require('../../models/auth/section.model');

const getTopStudents = async (req, res) => {
    try {
        // Find the top 5 students who have the most accepted statuses for each question
        const topStudents = await Status.findAll({
            attributes: [
                'UserinformationId',
                [sequelize.fn('COUNT', sequelize.col('questionId')), 'acceptedCount']
            ],
            where: {
                status: 'accepted'
            },
            group: ['UserinformationId'], // Group by User ID
            order: [[sequelize.literal('acceptedCount'), 'DESC']],
            limit: 5,
            include: [{
                model: User,
                attributes: ['fullName', 'email', 'userId'] // Include user details in the result
            }]
        });

        if (topStudents.length === 0) {
            return res.status(200).json({ topStudents: [] });
        }

        // Extract UserinformationId
        const userIds = topStudents.map(student => student.UserinformationId);

        // Fetch sections for each UserinformationId using Promise.all
        const sectionPromises = userIds.map(id => 
            Section.findAll({
                where: { UserinformationId: id },
                attributes: ['section']
            })
        );

        const sections = await Promise.all(sectionPromises);

        // Map sections to respective students
        topStudents.forEach((student, index) => {
            student.dataValues.sections = sections[index].map(section => section.section);
        });

        // Send the response back to the client
        res.status(200).json({ topStudents });
    } catch (error) {
        console.error('Error fetching top students:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = getTopStudents;
