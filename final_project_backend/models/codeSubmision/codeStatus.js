const { DataTypes } = require("sequelize");
const sequelize = require("../../database/sequelize");

const Status = sequelize.define("statusData", {
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  questionId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


module.exports =  Status ;
