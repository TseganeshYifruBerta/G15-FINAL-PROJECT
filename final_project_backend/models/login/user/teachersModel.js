const { DataTypes } = require("sequelize");
const sequelize = require("../../../database/sequelize");
const Teacher = require("../../registration/user/teachersModel");

const TeacherLogin = sequelize.define("TeacherLogin", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  teacherId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});



module.exports = TeacherLogin;