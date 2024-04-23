// student.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../database/sequelize");
const Solution = require("./solution");
const examTestCase = require("./examTestcase");

const studentsExamAnswer = require("./studentsExamAnswer");
const SelectedChapter = require("./SelectedChapter");
const ExamQuestion = sequelize.define("examQuestion", {

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  difficulty: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tag: {
    type: DataTypes.ENUM("Lab", "Final"),
    allowNull: false,
  },
  
  example: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  chapter :{
    type: DataTypes.STRING,
    allowNull: false,
  },
  teacherId:{
    type: DataTypes.STRING,
    allowNull: false,
  }

});


ExamQuestion.hasMany(Solution, { as: "solutions" });
ExamQuestion.hasMany(examTestCase, { as: "examTestCase" });
ExamQuestion.hasMany(studentsExamAnswer, { as: "studentsExamAnswer" });

studentsExamAnswer.belongsTo(ExamQuestion)
examTestCase.belongsTo(ExamQuestion);
Solution.belongsTo(ExamQuestion);

module.exports = ExamQuestion;

