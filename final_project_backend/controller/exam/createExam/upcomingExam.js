const Exam = require("../../../models/exam/createExam");
const SelectedSectionsForExam = require("../../../models/exam/SelectedSectionsForExam");
const User = require("../../../models/auth/user.model");
const { Op } = require("sequelize");
const Section = require("../../../models/auth/section.model");
// Function to get the exams for a user's section with the closest date
const getExamWithClosestDate = async (req, res) => {
    try {
        const { userId } = req.params; // Ensure you're accessing params correctly
        // First, find the user's section
        const userWithSection = await User.findOne({
            where: { id: userId },
            include: [{
                model: Section, // Assuming you have a Section model that relates to the User
                as: 'SectionsOfUser' // Assuming 'section' is the association alias
            }]
        });

        if (!userWithSection || !userWithSection.SectionsOfUser[0].section) {
            return res.status(404).json({ message: 'User or section not found' });
        }

        // Then, find all exams for that section
        const exams = await Exam.findAll({
            include: [{
                model: SelectedSectionsForExam,
                as: 'selectedSectionsForExam',
                where: { sections: userWithSection.SectionsOfUser[0].section }
            }],
            raw: true,
        });

        const now = new Date();

        // Calculate the absolute difference in time between each exam's date_and_time and now
        exams.forEach(exam => {
            const examDateTime = new Date(exam.date_and_time);
            exam.timeDifference = Math.abs(examDateTime - now);
        });

        // Sort exams by the closest time difference
        exams.sort((a, b) => a.timeDifference - b.timeDifference);

        // Return the closest exam
        const closestExam = exams[0];

        res.status(200).json(closestExam );
    } catch (error) {
        console.error('Failed to fetch exams:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = getExamWithClosestDate;
