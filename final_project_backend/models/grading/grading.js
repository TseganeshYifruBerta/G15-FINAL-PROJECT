const { DataTypes } = require("sequelize");
const sequelize = require("../../database/sequelize");
const e = require("express");


const gradeResult = sequelize.define("gradeResult", {
  
 
  examId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  examQuestionId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
  timeComplexity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  codeQuality: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  codeComment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  codeCorrectness: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  finalGrade:{
    type: DataTypes.STRING,
    allowNull: false,
  },
 
  
  studentId:{
        type: DataTypes.STRING,
        allowNull: false,
    },
  
  teacherId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
 

});


module.exports = gradeResult;