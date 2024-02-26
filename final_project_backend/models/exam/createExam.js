const { DataTypes, INTEGER } = require("sequelize");
const sequelize = require("../../database/sequelize");

const CreatExam = sequelize.define("examQuestion", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date_and_time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  instruction: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  question_ids:{
    type:DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false,

  }
});

module.exports = CreatExam;