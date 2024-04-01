   const { Sequelize } = require('sequelize');

   const sequelize = new Sequelize("proj", "root", "", {
     host: "localhost",
     dialect: "mysql",
     port: 3306,
   });

module.exports = sequelize;
