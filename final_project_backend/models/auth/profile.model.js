const { DataTypes } = require("sequelize");
const sequelize = require("../../database/sequelize");
const Section = require('./section.model'); // Import the Section model


const UserProfile = sequelize.define("UserProfileinformation", {
  fullName: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  university:{
    type: DataTypes.STRING,
  },
  
  linkedin:{
    type: DataTypes.STRING,
  },
  github:{
    type: DataTypes.STRING,
  },
  phoneNumber:{
    type: DataTypes.STRING,
  },
  telegramUsername:{    
    type: DataTypes.STRING,
  },
  gender:{
    type: DataTypes.STRING,
  },
  department:{
    type: DataTypes.STRING,
  },
  shortBio:{
    type: DataTypes.TEXT,
  },
  photoUrl:{
    type: DataTypes.TEXT,
  },
  userId: {
    type: DataTypes.STRING,},

  role: {
    type: DataTypes.ENUM('admin','student', 'teacher'),
  },

}); 



module.exports = UserProfile;

