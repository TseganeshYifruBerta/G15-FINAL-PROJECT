const { DataTypes } = require("sequelize");
const sequelize = require("../../database/sequelize");

const studentsExamAnswer = sequelize.define("studentsExamAnswer", {
  examId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  submittedAnswer: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
  

});


module.exports = studentsExamAnswer;