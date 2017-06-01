'use strict';

const passwordHash = require('password-hash');

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Users', [
      {
        email: 'ivan.yarymovych@gmail.com',
        password: passwordHash.generate('YaRymov!11'),
        is_activate: true,
        profile_id: 1,
        createdAt: '2017-05-25 15:53:13.815+03',
        updatedAt: '2017-05-25 15:53:13.815+03'
      },
      {
        email: 'roma@gmail.com',
        password: passwordHash.generate('112345Qwerty%'),
        is_activate: true,
        profile_id: 2,
        createdAt: '2017-05-25 15:53:13.815+03',
        updatedAt: '2017-05-25 15:53:13.815+03'
      }
    ]),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Users', null)
};
