'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Gifts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(15),
        allowNull: false
      },
      description: {
        type: Sequelize.STRING(150),
        allowNull: true
      },
      link: {
        type: Sequelize.STRING(150),
        allowNull: true
      },
      event_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Events',
          key: 'id'
        }
      },
      is_available: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      status_gift_id: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'GiftStatuses',
          key: 'id'
        }
      },
      createdAt: {
        type: Sequelize.BIGINT
      },
      updatedAt: {
        type: Sequelize.BIGINT
      }
    }),
  down: (queryInterface, Sequelize) =>
    queryInterface.dropTable('Gift')
};
