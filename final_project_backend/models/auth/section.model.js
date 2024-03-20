const { DataTypes } = require("sequelize");
const sequelize = require("../../database/sequelize");
const Section = sequelize.define("SectionsOfUser", {
  section: {
    type: DataTypes.STRING
  },
  role: {
    type: DataTypes.ENUM('student', 'teacher'),

  }
});

module.exports = Section;