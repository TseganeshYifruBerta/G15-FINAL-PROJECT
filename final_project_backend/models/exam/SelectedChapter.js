// student.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../database/sequelize");
const SelectedChapter = sequelize.define("SelectedChapter", {

  chapter : {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
});

module.exports = SelectedChapter;

