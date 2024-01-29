// testCase.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../database/sequelize");

const TestCase = sequelize.define("TestCase", {
   
  input: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  output: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

module.exports = TestCase;