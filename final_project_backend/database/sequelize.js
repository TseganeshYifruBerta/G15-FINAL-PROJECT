const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'root', 'g15', {
    host: 'localhost', 
    dialect: 'mysql',
    port: 3307, 
});

module.exports = sequelize;
