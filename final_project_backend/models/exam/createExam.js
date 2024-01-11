// student.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../database/sequelize");
const Solution = require("./solution");
const TestCase = require("./testCase");

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
});

Question.hasMany(Solution, { as: "solutions" });
Question.hasMany(TestCase, { as: "testCases" });

TestCase.belongsTo(Question);
Solution.belongsTo(Question);

module.exports = Question;