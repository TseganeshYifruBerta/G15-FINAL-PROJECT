const { DataTypes } = require('sequelize');
const sequelize = require('../../database/sequelize'); // Adjust this path to where your Sequelize instance is initialized

const SelectedQuestionForExam = sequelize.define('selectedQuestionForExam', {
   
    question_ids: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // You can add more properties here as needed.
});

module.exports = SelectedQuestionForExam;
