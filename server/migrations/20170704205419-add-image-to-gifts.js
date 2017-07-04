'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn(
      'Gifts', 'image', Sequelize.BLOB
  ),

  down: (queryInterface, Sequelize) =>
    queryInterface.removeColumn('Gifts', 'image')
};
