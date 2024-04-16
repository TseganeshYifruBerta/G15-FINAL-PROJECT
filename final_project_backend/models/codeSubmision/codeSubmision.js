const { DataTypes } = require("sequelize");
const sequelize = require("../../database/sequelize");
const Status = require("./codeStatus")
const codeSubmision = sequelize.define("submittedCodes", {
  userId: {
    type: DataTypes.STRING,
  },
  questionId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userCode: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: "",
  },
  section:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

codeSubmision.hasMany(Status, {as:"Status"});
Status.belongsTo(codeSubmision);

module.exports = codeSubmision;
