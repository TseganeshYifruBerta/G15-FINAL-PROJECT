const { DataTypes } = require('sequelize');
const sequelize = require('../../database/sequelize'); // Adjust this path to where your Sequelize instance is initialized

const Question = sequelize.define('Question', {
   
    question_ids: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // You can add more properties here as needed.
});

module.exports = Question;
