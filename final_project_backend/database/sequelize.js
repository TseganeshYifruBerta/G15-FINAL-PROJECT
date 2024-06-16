const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("roz_profile", "root", "", {
  host: "localhost",
  dialect: "mysql",
  port: 3308,
  dialectOptions: {
    connectTimeout: 60000  // 60 seconds
  }
});

module.exports = sequelize;
