const { DataTypes } = require("sequelize");
const sequelize = require("../../database/sequelize");
const e = require("express");
const plagiarismSection = require("./plagiarizedSection.model");

const Allplagiarism = sequelize.define("allPlagiarism", {
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    },
  otherUserId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  percentage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  examId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  question: {
    type: DataTypes.STRING,
    allowNull: false,
  },




});
Allplagiarism.hasMany(plagiarismSection, {as: 'plagiarismSectionId' });
plagiarismSection.belongsTo(Allplagiarism);
module.exports = Allplagiarism;


