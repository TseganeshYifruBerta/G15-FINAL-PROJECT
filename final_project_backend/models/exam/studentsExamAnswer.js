const { DataTypes } = require("sequelize");
const sequelize = require("../../database/sequelize");
const studentsExamDetail = require("./submittedExamDetail");
const studentsExamAnswer = sequelize.define("studentsExamAnswer", {
  examId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  }

});
studentsExamAnswer.hasMany(studentsExamDetail, { as: "studentsExamDetails" });
studentsExamDetail.belongsTo(studentsExamAnswer);

module.exports = studentsExamAnswer;