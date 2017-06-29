'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      gift_id: {
        type: Sequelize.INTEGER,
        unique: false,
        allowNull: false,
        references: {
          model: 'Gifts',
          key: 'id'
        }
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      parent_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: false
      },
      createdAt: {
        type: Sequelize.BIGINT
      },
      updatedAt: {
        type: Sequelize.BIGINT
      }
    }),
  down: (queryInterface, Sequelize) =>
    queryInterface.dropTable('Comments')
};
