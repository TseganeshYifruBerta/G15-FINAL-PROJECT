const { DataTypes } = require("sequelize");
const sequelize = require("../../../database/sequelize");

const StudentsLogin = sequelize.define("LoggedInStudents", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
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
});

module.exports = { StudentsLogin };
