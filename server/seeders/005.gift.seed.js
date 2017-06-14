'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Gifts', [
      {
        name: 'Smartphone',
        description: 'Want this super cool phone',
        link: 'supercool.phone.com',
        event_id: 2,
        is_available: true,
        status_gift_id: 1,
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        name: 'Vaccum cleaner',
        description: 'Want this awesome Dyson vacuum cleaner',
        link: 'dyson.com/vacuum',
        event_id: 2,
        is_available: true,
        status_gift_id: 1,
        createdAt: Date.now(),
        updatedAt: Date.now()
      }
    ]),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Gift', null)
};
