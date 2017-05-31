'use strict';

const bcrypt = require('bcrypt');
const rounds = 8;

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Users', [
      {
        email: 'ivan.yarymovych@gmail.com',
        password: bcrypt.hashSync('YaRymov!11', rounds),
        is_activate: true,
        profile_id: 1,
        createdAt: '2017-05-25 15:53:13.815+03',
        updatedAt: '2017-05-25 15:53:13.815+03'
      },
      {
        email: 'roma@gmail.com',
        password: bcrypt.hashSync('112345Qwerty%', rounds),
        is_activate: true,
        profile_id: 2,
        createdAt: '2017-05-25 15:53:13.815+03',
        updatedAt: '2017-05-25 15:53:13.815+03'
      }
    ]),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Users', null)
};
