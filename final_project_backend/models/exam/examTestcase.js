// testCase.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../database/sequelize");

const examTestCase = sequelize.define("examTestCase", {
   
  input: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  output: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

module.exports = examTestCase;