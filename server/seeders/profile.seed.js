'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Profiles', [
      {
        first_name: "John",
        last_name: "Doe",
        birth_date: "",
        city: "Chicago",
        country: "US"
      },
      {
        first_name: "Tom",
        last_name: "Smith",
        birth_date: "",
        city: "London",
        country: "UK",
      }
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Profiles', null, {});
  }
};
