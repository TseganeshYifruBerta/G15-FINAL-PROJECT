const { DataTypes } = require("sequelize");
const sequelize = require("../../database/sequelize");

const creatExam = sequelize.define("exam", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date_and_time: {
    type: DataTypes.STRING, // Consider using DataTypes.DATE for actual date comparison
    allowNull: false,
  },
  instruction: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  question_ids: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('upcoming', 'running', 'end'),
    allowNull: false,
    defaultValue: 'upcoming', // Default status is 'upcoming'
  },
  duration:{
   type: DataTypes.INTEGER,
   allowNull: false,
  
  },
  section:{
    
   type: DataTypes.ARRAY(DataTypes.INTEGER),
   allowNull :false

  }

});
module.exports = creatExam;