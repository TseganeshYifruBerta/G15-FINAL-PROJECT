const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("sql8708187", "sql8708187", "U1der92rig", {
  host: "sql8.freemysqlhosting.net",
  dialect: "mysql",
  port: 3306,
});

module.exports = sequelize;

