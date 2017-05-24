'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('profiles', {
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
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('profiles');
  }
};
