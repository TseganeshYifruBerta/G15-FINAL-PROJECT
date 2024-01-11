const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../database/sequelize");

const StudentUploadData = sequelize.define("StudentsUploadedDatas", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  userID: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  // Add more fields as needed
});

module.exports = StudentUploadData;
