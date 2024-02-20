   const { Sequelize } = require('sequelize');

   const sequelize = new Sequelize("finalproject", "root", "", {
     host: "localhost",
     dialect: "mysql",
     port: 3306, 
   });

   module.exports = sequelize;
