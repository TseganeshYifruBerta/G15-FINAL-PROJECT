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
  
  timeComplexityValue: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timeComplexityDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  codeQualityValue: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  codeQualityDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  codeCommentValue: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  codeCommentDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  codeCorrectnessValue: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  codeCorrectnessDescription: {
    type: DataTypes.TEXT,
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