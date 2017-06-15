'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('GiftStatuses', [
      {
        id: 1,
        name: 'hasMultipleDonors'
      },
      {
        id: 2,
        name: 'hasOneDonor'
      },
    ]),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('GiftStatuses', null)
};
