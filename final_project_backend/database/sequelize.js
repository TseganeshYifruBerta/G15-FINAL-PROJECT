const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("roz_profile", "root", "", {
  host: "localhost",
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
