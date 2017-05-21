'use strict';
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
         id: { 
           type: Sequelize.INTEGER,
           primaryKey: true, 
           autoIncrement: true 
         }, 
         email: { 
           type: Sequelize.STRING,
           allowNull: false,
           validate: {
             isEmail: true
           }
         }, 
         password: { 
           type: Sequelize.TEXT, 
           allowNull: false,
           validate: {
             len: [8,15]
           }
         }, 
         profile_id: { 
           type: Sequelize.INTEGER
         },
         is_activate: { 
           type: Sequelize.BOOLEAN,
           allowNull: false 
         }, 
         status_user_state: { 
           type: Sequelize.STRING
         }
    });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};