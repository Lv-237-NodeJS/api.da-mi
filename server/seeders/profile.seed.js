'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Profiles', [
      {
        first_name: "John",
        last_name: "Doe",
        country: "US"
      },
      {
        first_name: "Tom",
        last_name: "Smith",
        country: "UK"
      }
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Profiles', null, {});
  }
};
