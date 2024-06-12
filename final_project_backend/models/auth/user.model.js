const { DataTypes } = require("sequelize");
const sequelize = require("../../database/sequelize");
const Section = require('./section.model'); // Import the Section model
const studentsExamAnswer = require("../exam/studentsExamAnswer");
const Status = require('../codeSubmision/codeStatus');

const User = sequelize.define("Userinformation", {
  fullName: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  userId: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.ENUM('active','inactive')
  },
  loginAttempt: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  role: {
    type: DataTypes.ENUM('admin','student', 'teacher'),
  },
  university:{
    type: DataTypes.STRING,
    defaultValue:""
  },
  linkedin:{
    type: DataTypes.STRING,
    defaultValue:""
  },
  github:{
    type: DataTypes.STRING,
    defaultValue:""
  },
  phoneNumber:{
    type: DataTypes.STRING,
    defaultValue:""
  },
  gender:{
    type: DataTypes.ENUM('female','male')
  },
  department:{
    type: DataTypes.STRING,
    defaultValue:""
  },
  shortBio:{
    type: DataTypes.TEXT,
    defaultValue:""
  },
  photoUrl:{
    type: DataTypes.TEXT,
    defaultValue:""
  },

});

User.hasMany(Section, { as: "SectionsOfUser" });
User.hasMany(studentsExamAnswer, { as: "studentsExamAnswer" });

User.hasMany(Status, { as: "statusData" });
Status.belongsTo(User);

studentsExamAnswer.belongsTo(User)

Section.belongsTo(User);

module.exports = User;
