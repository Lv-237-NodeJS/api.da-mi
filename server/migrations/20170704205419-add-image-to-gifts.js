'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn(
      'Gifts', 'image', Sequelize.STRING(200000)
  ),

  down: (queryInterface, Sequelize) =>
    queryInterface.removeColumn('Gifts', 'image')
};
