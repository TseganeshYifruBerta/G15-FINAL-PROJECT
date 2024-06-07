const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("if0_36689291_final", "if0_36689291", "Tg086whQSE", {
  host: "sql113.infinityfree.com",
  dialect: "mysql",
  port: 3306,
});

module.exports = sequelize;
