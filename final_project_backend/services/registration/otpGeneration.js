const { DataTypes } = require("sequelize");
const Sequelize = require("../../database/sequelize");

const otpModel = Sequelize.define("otp", {
  email: { type: DataTypes.STRING, allowNull: false },
  otp: { type: DataTypes.STRING, allowNull: false },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, expires: 60 },
});

module.exports = otpModel;
