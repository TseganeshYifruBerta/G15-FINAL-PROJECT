const { DataTypes } = require("sequelize");
const sequelize = require("../../../database/sequelize");
const Teacher = require("../../registration/user/teachersModel");

const TeacherLogin = sequelize.define("TeacherLogin", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define associations between TeacherLogin and Teacher models
TeacherLogin.belongsTo(Teacher, { foreignKey: "teacherId", targetKey: "id" });

module.exports = TeacherLogin;