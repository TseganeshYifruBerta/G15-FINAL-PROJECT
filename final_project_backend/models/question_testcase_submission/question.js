// student.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../database/sequelize");
const TestCase = require("./testCase")
const Question = sequelize.define("labQuestion", {
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
  example: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  teacherId:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  functionName:{
    type: DataTypes.STRING,
    allowNull: false,
  }

  
});
Question.hasMany(TestCase, { as: "TestCases" });

TestCase.belongsTo(Question);

module.exports = Question;
