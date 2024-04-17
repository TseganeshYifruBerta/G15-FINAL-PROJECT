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
  
  linkdien:{
    type: DataTypes.STRING,
  },
  github:{
    type: DataTypes.STRING,
  },
  phoneNo:{
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
  shortbio:{
    type: DataTypes.TEXT,
  },
  photo:{
    type: DataTypes.STRING,
  },
  userId: {
    type: DataTypes.STRING,},

  role: {
    type: DataTypes.ENUM('admin','student', 'teacher'),
  },

}); 

UserProfile.hasMany(Section, { as: "SectionsOfUser" });

Section.belongsTo(UserProfile);

module.exports = UserProfile;

