'use strict';

const bcrypt = require('bcrypt');
const rounds = 8;

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Users', [
      {
        email: 'ivan.yarymovych@gmail.com',
        password: bcrypt.hashSync('password', rounds),
        is_activate: true,
        createdAt: '2017-05-25 15:53:13.815+03',
        updatedAt: '2017-05-25 15:53:13.815+03'
      },
      {
        email: 'roma@gmail.com',
        password: bcrypt.hashSync('13452', rounds),
        is_activate: true,
        createdAt: '2017-05-25 15:53:13.815+03',
        updatedAt: '2017-05-25 15:53:13.815+03'
      }
    ]),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Users', null)
};
