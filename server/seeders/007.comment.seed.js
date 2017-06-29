'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Comments', [
      {
        user_id: 1,
        gift_id: 1,
        body: 'I\'ll book it ...',
        parent_id: null,
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        user_id: 2,
        gift_id: 1,
        body: 'I\'ll book it ...',
        parent_id: 1,
        createdAt: Date.now(),
        updatedAt: Date.now()
      }
    ]),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Comments', null)
};
