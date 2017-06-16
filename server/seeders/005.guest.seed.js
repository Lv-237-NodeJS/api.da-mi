'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Guests', [
      {
        event_id: 1,
        user_id: 1,
        status: 'going',
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        event_id: 1,
        user_id: 2,
        status: 'undecided',
        createdAt: Date.now(),
        updatedAt: Date.now()
      }
    ]),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Guests', null)
};
