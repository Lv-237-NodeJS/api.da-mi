'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Profiles', [
      {
        first_name: 'Ivan',
        last_name: 'Yarymovych',
        birth_date: '1994-07-02',
        address: 'Sheptyckogo street, 46',
        city: 'Lviv',
        country: 'Ukraine',
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        first_name: 'Roman',
        last_name: 'Kulyk',
        birth_date: '1996-06-17',
        address: 'Nova street, 2',
        city: 'Novyi Rozdil',
        country: 'Ukraine',
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        first_name: 'Taras',
        last_name: 'Kolo',
        birth_date: '1996-12-30',
        address: 'Nova street, 5',
        city: 'Kyiv',
        country: 'Ukraine',
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        first_name: 'Pavlo',
        last_name: 'Kryk',
        birth_date: '1996-06-25',
        address: 'Nova street, 9',
        city: 'Novyi Rozdil',
        country: 'Ukraine',
        createdAt: Date.now(),
        updatedAt: Date.now()
      }
    ]),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Profiles', null)
};
