'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('statusEvents', [
      {
        id: 1,
        name: 'draft'
      },
      {
        id: 2,
        name: 'public'
      },
      {
        id: 3,
        name: 'finished'
      }
    ]),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('statusEvents', null)
};
