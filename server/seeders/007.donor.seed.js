'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Donors', [
      {
        gift_id: 1,
        user_id: 1
      },
      {
        gift_id: 1,
        user_id: 2
      }
    ]),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Donors', null)
};
