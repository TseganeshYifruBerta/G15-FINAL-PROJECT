const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("database", "root", "g15", {
  host: "mysql", 
  dialect: "mysql",
  port: 3306,
});

module.exports = sequelize;
