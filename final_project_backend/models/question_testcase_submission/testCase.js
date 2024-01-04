// models/testCase.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../database/sequelize"); // Assuming your Sequelize instance is exported from a file named 'database'

const TestCase = sequelize.define("TestCase", {
  nums: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  target: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  output: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

module.exports = TestCase;
