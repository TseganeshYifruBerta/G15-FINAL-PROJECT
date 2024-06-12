const { DataTypes } = require("sequelize");
const sequelize = require("../../database/sequelize");



const criteria = sequelize.define("criteriaExamQuestion", {
  
 
  examId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  examQuestionId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
  timeComplexity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  codeQuality: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  codeComment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  codeCorrectness: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
  teacherId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
 

});


module.exports = criteria;