const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("sql12712404", "sql12712404", "CWVcNymWhE", {
  host: "sql12.freemysqlhosting.net",
  dialect: "mysql",
  port: 3306,
  pool: {
    max: 10,
    min: 0,
    acquire: 60000, // Increase the acquire timeout to 60 seconds
    idle: 10000
  },
  dialectOptions: {
    connectTimeout: 60000 // Increase the connection timeout to 60 seconds
  }
});

module.exports = sequelize;
