'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Profiles', [
      {
        first_name: "John",
        last_name: "Doe",
        birth_date: "",
        address: "Street 1",
        city: "Chicago",
        country: "US",
        createdAt: "2017-05-30T19:34:26.150Z",
        updatedAt: "2017-05-30T19:34:26.150Z"
      },
      {
        first_name: "Tom",
        last_name: "Smith",
        birth_date: "",
        address: "Street 2",
        city: "London",
        country: "UK",
        createdAt: "2017-05-30T19:34:26.150Z",
        updatedAt: "2017-05-30T19:34:26.150Z"
      }
    ]);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Profiles', null);
  }
};
