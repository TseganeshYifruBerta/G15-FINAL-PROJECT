// testCase.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../database/sequelize");

const TestCase = sequelize.define("TestCase", {
    nums: {
        type: DataTypes.JSON,
        allowNull: false,
      },
  input: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  output: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = TestCase;