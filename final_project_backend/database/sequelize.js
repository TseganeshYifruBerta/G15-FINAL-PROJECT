   const { Sequelize } = require('sequelize');

   const sequelize = new Sequelize('database_name', 'username', 'password', {
     host: 'localhost',
     dialect: 'mysql',
     port : 9987  // write your port number

   });

   module.exports = sequelize;
