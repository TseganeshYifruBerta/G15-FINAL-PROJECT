// solution.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../database/sequelize");

const Solution = sequelize.define("Solution", {
  content: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

module.exports = Solution;