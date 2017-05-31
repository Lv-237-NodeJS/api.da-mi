'use strict';
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('profiles', [
      {
        firstname: 'Ivan',
        lastname: 'Yarymovych'
      }, 
      {
        firstname: 'Roman',
        lastname: 'Kulyk'
      }
    ], {});
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('profiles', null, {});
  }
};
