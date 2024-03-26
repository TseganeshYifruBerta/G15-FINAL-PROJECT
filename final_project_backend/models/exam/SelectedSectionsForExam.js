const { DataTypes } = require('sequelize');
const sequelize = require('../../database/sequelize'); // Adjust this path to where your Sequelize instance is initialized

const SelectedSectionsForExam = sequelize.define('selectedSectionsForExam', {
    // Assuming 'content' is an integer value you want to store, for example, a section number or ID.
    // Just ensure the property name and its intended use align with your application logic.
    sections: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // You can add more properties here as needed.
});

module.exports = SelectedSectionsForExam












;
