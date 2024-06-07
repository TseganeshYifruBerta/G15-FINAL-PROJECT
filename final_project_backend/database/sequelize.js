const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("sql12712404", "sql12712404", "CWVcNymWhE", {
  host: "sql12.freemysqlhosting.net",
  dialect: "localhost",
  port: 3306,
});

module.exports = sequelize;
