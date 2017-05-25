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
        type: Sequelize.STRING,
        max: 250
      },
      city: {
        type: Sequelize.STRING,
        max: 100
      },
      country: {
        type: Sequelize.STRING,
        max: 100
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Profiles');
  }
};
