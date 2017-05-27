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
        createdAt: "2017-05-25 15:53:13.815+03",
        updatedAt: "2017-05-25 15:53:13.815+03"
      },
      {
        first_name: "Tom",
        last_name: "Smith",
        birth_date: "",
        address: "Street 2",
        city: "London",
        country: "UK",
        createdAt: "2017-05-25 15:53:13.815+03",
        updatedAt: "2017-05-25 15:53:13.815+03"
      }
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Profiles', null, {});
  }
};
