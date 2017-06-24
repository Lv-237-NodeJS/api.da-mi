'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Events', [
      {
        name: 'wedding',
        date_event: Date.parse('2017-06-01 15:00:00.00+03'),
        owner: 1,
        location_name: 'restoran Kryva Lypa',
        longitude:  24.026109,
        latitude: 49.840575,
        description: 'The wedding will be on Sunday',
        status_event_id: 1,
        createdAt: Date.now(),
        updatedAt: Date.now()
      }
    ]),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Events', null)
};
