'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Profiles', [
      {
        first_name: "John",
        last_name: "Doe"
      },
      {
        first_name: "Tom",
        last_name: "Smith"
      }
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Profiles', null, {});
  }
};