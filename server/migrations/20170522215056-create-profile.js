'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
        max: 50
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
        max: 50
      },
      avatar: {
        type: Sequelize.BLOB,
        max: 65000
      },
      birth_date: {
        type: Sequelize.DATE
      },
      address: {
        type: DataTypes.STRING,
        max: 200
      },
      city: {
        type: DataTypes.STRING,
        max: 200
      },
      country: {
        type: DataTypes.STRING,
        max: 200
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Profiles');
  }
};
