'use strict';
module.exports = function(sequelize, DataTypes) {
  var status_gift = sequelize.define('status_gift', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return status_gift;
};