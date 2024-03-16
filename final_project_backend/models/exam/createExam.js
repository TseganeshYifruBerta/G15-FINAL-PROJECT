const { DataTypes } = require("sequelize");
const sequelize = require("../../database/sequelize");
const e = require("express");
const Sections = require("./section");
const Question = require("./questions");

const creatExam = sequelize.define("exam", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date_and_time: {
    type: DataTypes.STRING, // Consider using DataTypes.DATE for actual date comparison
    allowNull: false,
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
  duration:{
   type: DataTypes.INTEGER,
   allowNull: false,
  
  },

});


creatExam.hasMany(Sections, { as: "sections" });
Sections.belongsTo(creatExam);

creatExam.hasMany(Question, { as: "questions" });
Question.belongsTo(creatExam);

module.exports = creatExam;