const { DataTypes } = require("sequelize");
const sequelize = require("../../database/sequelize");

const studentsExamDetail = sequelize.define("studentsExamDetail", {
  
 
  
  submittedAnswer: {
    type: DataTypes.STRING,
    allowNull: false,
  }

});
module.exports = studentsExamDetail;