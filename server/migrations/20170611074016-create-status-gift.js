'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('GiftStatuses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(35)
      }
    });
  },
  down: (queryInterface, Sequelize) =>
    queryInterface.dropTable('GiftStatuses')
};
