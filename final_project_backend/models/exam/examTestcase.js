// testCase.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../database/sequelize");

const examTestCase = sequelize.define("examTestCase", {
   
  input: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  output: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = examTestCase;