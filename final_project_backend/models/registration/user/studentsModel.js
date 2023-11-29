// student.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../../database/sequelize');

const Student = sequelize.define('Student', {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  confirmPassword: {
    type: DataTypes.VIRTUAL, 
    allowNull: false,
    validate: {
      isConfirmed(value) {
        if (value !== this.password) {
          throw new Error('Passwords do not match');
        }
      },
    },
  },
  section: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Student;
