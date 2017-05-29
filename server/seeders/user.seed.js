'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Users', [
      {
        email: 'ivan.yarymovych@gmail.com',
        password: bcrypt.hashSync('password', 8),
        is_activate: true,
        created_at: '2017-05-25 15:53:13.815+03',
        updated_at: '2017-05-25 15:53:13.815+03'
      },
      {
        email: 'roma@gmail.com',
        password: bcrypt.hashSync('13452', 8),
        is_activate: true,
        created_at: '2017-05-25 15:53:13.815+03',
        updated_at: '2017-05-25 15:53:13.815+03'
      }
    ]),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Users', null)
};
