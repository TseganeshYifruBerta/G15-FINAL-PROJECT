// models/testCase.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../database/sequelize"); // Assuming your Sequelize instance is exported from a file named 'database'

const TestCase = sequelize.define("TestCases", {
  output: {
    type: DataTypes.STRING ,
    allowNull: false,
  },
  input: {
    type: DataTypes.STRING,
    allowNull: false,
  },

});

module.exports = TestCase;
