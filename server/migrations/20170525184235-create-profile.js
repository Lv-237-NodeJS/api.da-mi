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
        type: Sequelize.STRING(50),
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      avatar: {
        type: Sequelize.BLOB
      },
      birth_date: {
        type: Sequelize.DATE
      },
      address: {
        type: Sequelize.STRING(255)
      },
      city: {
        type: Sequelize.STRING(100)
      },
      country: {
        type: Sequelize.STRING(100)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        // defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        // defaultValue: Sequelize.fn('now')
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Profiles');
  }
};
