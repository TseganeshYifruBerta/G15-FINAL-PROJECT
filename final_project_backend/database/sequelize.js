   const { Sequelize } = require('sequelize');

   const sequelize = new Sequelize("database_name", "username", "password", {
     host: "localhost",
     dialect: "mysql",
     port: 3306, 
   });

   module.exports = sequelize;
