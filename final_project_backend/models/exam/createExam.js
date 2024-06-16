const { DataTypes } = require("sequelize");
const sequelize = require("../../database/sequelize");
const e = require("express");
const SelectedSectionsForExam = require("./SelectedSectionsForExam");
const SelectedQuestionForExam = require("./SelectedQuestionForExam");
const SelectedChapter = require("./SelectedChapter");

const creatExam = sequelize.define("exam", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  examDate: {
    type: DataTypes.STRING, // Consider using DataTypes.DATE for actual date comparison
    allowNull: false,
  },

<<<<<<< HEAD
  examTime :{
=======
  eXamTime :{
>>>>>>> afcd2cb (update)
    type: DataTypes.STRING,
    allowNull: false,

  },
  start_time: {
    type: DataTypes.STRING,
<<<<<<< HEAD
    defaultValue: "00:00",
=======
    allowNull: "00:00",
>>>>>>> afcd2cb (update)

  },
  instruction: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
  status: {
    type: DataTypes.ENUM('upcoming', 'running', 'end'),
    allowNull: false,
    defaultValue: 'upcoming', // Default status is 'upcoming'
  },
  passKey:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,

  },
  tag:{
    type: DataTypes.ENUM('Lab', 'Final'),
    allowNull: false,
  },

  easy_questions: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  medium_questions: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  hard_questions: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  teacherId: {
    type: DataTypes.STRING,
    allowNull: false,
  }

});

creatExam.hasMany(SelectedChapter , {as : "selectedChapters"});
SelectedChapter.belongsTo(creatExam);

creatExam.hasMany(SelectedSectionsForExam, { as: "selectedSectionsForExam" });
SelectedSectionsForExam.belongsTo(creatExam);

creatExam.hasMany(SelectedQuestionForExam, { as: "selectedQuestionsForExam" });
SelectedQuestionForExam.belongsTo(creatExam);

module.exports = creatExam;