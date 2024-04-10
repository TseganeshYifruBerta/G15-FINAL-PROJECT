const { DataTypes } = require('sequelize');
const sequelize = require('../../database/sequelize'); // Adjust this path to where your Sequelize instance is initialized

const SelectedSectionsForExam = sequelize.define('selectedSectionsForExam', {
   
    sections: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = SelectedSectionsForExam












;
