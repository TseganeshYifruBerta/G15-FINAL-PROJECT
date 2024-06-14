const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("roz_profile", "root", "", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
});

module.exports = sequelize;
