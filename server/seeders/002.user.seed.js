'use strict';

const passwordHash = require('password-hash');

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Users', [
      {
        email: 'ivan.yarymovych@gmail.com',
        password: passwordHash.generate('P!assword!1'),
        is_activate: true,
        profile_id: 1,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        is_invited: false
      },
      {
        email: 'roma@gmail.com',
        password: passwordHash.generate('13DDss@'),
        is_activate: true,
        profile_id: 2,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        is_invited: false
      }
    ]),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Users', null)
};
