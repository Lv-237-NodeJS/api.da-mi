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
      },
      {
        email: 'taras@gmail.com',
        password: passwordHash.generate('13DDss@3'),
        is_activate: false,
        profile_id: 3,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        is_invited: true
      },
      {
        email: 'pavlo@gmail.com',
        password: passwordHash.generate('13DDss@4'),
        is_activate: true,
        profile_id: 4,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        is_invited: true
      }
    ]),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Users', null)
};
