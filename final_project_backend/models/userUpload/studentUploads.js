const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../database/sequelize");
const studentData = sequelize.define("StudentsUploadedDatas", {
  name: {
    type: Sequelize.STRING,
  },
  userID: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  section: {
    type: Sequelize.STRING,
  },
});

module.exports = studentData;
