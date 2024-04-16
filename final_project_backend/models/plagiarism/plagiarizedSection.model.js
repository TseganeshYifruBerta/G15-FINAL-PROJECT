const { DataTypes } = require("sequelize");
const sequelize = require("../../database/sequelize");
const e = require("express");


const plagiarismSection = sequelize.define("plagiarismSection", {
 
  taggedcode: {
    type: DataTypes.TEXT,
    allowNull: false,
  }

});
module.exports = plagiarismSection;


