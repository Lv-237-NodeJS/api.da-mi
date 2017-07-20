'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Donors', [
      {
        gift_id: 1,
        user_id: 1,
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        gift_id: 1,
        user_id: 2,
        createdAt: Date.now(),
        updatedAt: Date.now()
      }
    ]),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Donors', null)
};
