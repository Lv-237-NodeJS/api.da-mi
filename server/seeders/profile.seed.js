'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Profiles', [
      {
        first_name: 'John',
        last_name: 'Doe',
        birth_date: '1980-06-17',
        address: 'Street 1',
        city: 'Chicago',
        country: 'US',
        createdAt: '2017-05-30T19:34:26.150Z',
        updatedAt: '2017-05-30T19:34:26.150Z'
      },
      {
        first_name: 'Tom',
        last_name: 'Smith',
        birth_date: '1990-06-17',
        address: 'Street 2',
        city: 'London',
        country: 'UK',
        createdAt: '2017-05-30T19:34:26.150Z',
        updatedAt: '2017-05-30T19:34:26.150Z'
      }
    ]),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Profiles', null)
};
