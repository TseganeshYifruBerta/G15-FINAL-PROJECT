const { DataTypes } = require("sequelize");
const sequelize = require("../../database/sequelize");

const Difficulty = sequelize.define("difficultyData", {
  easyCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  mediumCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  hardCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  totalCount: {
    type: DataTypes.INTEGER,

    defaultValue: 0,
  },
  userId:{
    type: DataTypes.STRING,
    defaultValue: "",

  
  }
});
Difficulty.sync({ alter: true }).then(() => {
  // Check if there are any existing records
  Difficulty.findAndCountAll().then((result) => {
    if (result.count === 0) {
      // If no records exist, create a new record with default values
      Difficulty.create({});
    }
  });
});

module.exports = Difficulty;
