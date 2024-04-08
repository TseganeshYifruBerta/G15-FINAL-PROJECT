   const { Sequelize } = require('sequelize');

   const sequelize = new Sequelize("your_database", "root", "", {
     host: "localhost",
     dialect: "mysql",
     port: 3306,
   });

module.exports = sequelize;
