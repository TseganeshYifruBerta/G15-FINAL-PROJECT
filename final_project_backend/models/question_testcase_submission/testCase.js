// models/testCase.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../database/sequelize"); // Assuming your Sequelize instance is exported from a file named 'database'

const TestCase = sequelize.define("TestCases", {
  output: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  input: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  // userId: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  // },
});

module.exports = TestCase;
