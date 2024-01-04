const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../database/sequelize");

const TeacherUploadData = sequelize.define("StudentsUploadedData", {
  fullName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  section: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  // Add more fields as needed
});

module.exports = TeacherUploadData;
