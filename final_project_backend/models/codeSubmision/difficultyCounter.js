const { DataTypes } = require("sequelize");
const sequelize = require("../../database/sequelize");

const Difficulty = sequelize.define("difficultyData", {
  easyCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  mediumCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  hardCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  totalCount: {
    type: DataTypes.INTEGER,

    defaultValue: 0,
  },
});

module.exports = Difficulty;
