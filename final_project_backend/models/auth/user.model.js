const { DataTypes } = require("sequelize");
const sequelize = require("../../database/sequelize");
const Section = require('./section.model'); // Import the Section model

const User = sequelize.define("Userinformation", {
  name: {
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
  role: {
    type: DataTypes.ENUM('admin','student', 'teacher'),
  },

});

User.hasMany(Section, { as: "SectionsOfUser" });

Section.belongsTo(User);
module.exports = User;
