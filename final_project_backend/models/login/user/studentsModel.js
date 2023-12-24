const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const { model } = require('../../../database/sequelize');

const Student = sequelize.define('Student', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = {Student};