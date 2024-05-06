   const { Sequelize } = require('sequelize');

   const sequelize = new Sequelize("sql11704387", "sql11704387", "Cp4WwKKu4W", {
     host: "sql11.freemysqlhosting.net",
     dialect: "mysql",
     port: 3306,
   });

module.exports = sequelize;

