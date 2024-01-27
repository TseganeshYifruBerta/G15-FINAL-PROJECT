const { DataTypes } = require("sequelize");
const sequelize = require("../../../database/sequelize");

const StudentsLogin = sequelize.define("LoggedInStudents", {
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  studentId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = StudentsLogin ;
