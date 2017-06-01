'use strict';

const passwordHash = require('password-hash');

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Users', [
      {
        email: 'ivan.yarymovych@gmail.com',
        password: passwordHash.generate('password'),
        is_activate: true,
        profile_id: 1,
        createdAt: '2017-06-01 20:32:03.52+03',
        updatedAt: '2017-06-01 20:32:03.52+03'
      },
      {
        email: 'roma@gmail.com',
        password: passwordHash.generate('13452'),
        is_activate: true,
        profile_id: 2,
        createdAt: '2017-06-01 20:32:03.52+03',
        updatedAt: '2017-06-01 20:32:03.52+03'
      }
    ]),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Users', null)
};
