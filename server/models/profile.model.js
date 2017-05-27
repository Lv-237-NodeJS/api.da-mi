'use strict';

module.exports = function(sequelize, DataTypes) {
  var Profile = sequelize.define('Profile', {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      max: 50
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      max: 50
    },
    avatar: {
      type: DataTypes.BLOB,
      max: 65000
    },
    birth_date: {
      type: DataTypes.DATE
    },
    address: {
      type: DataTypes.STRING,
      max: 250
    },
    city: {
      type: DataTypes.STRING,
      max: 100
    },
    country: {
      type: DataTypes.STRING,
      max: 100
    },
  }, {
    classMethods: {
      associate: function(models) {
       
      },
    },
  });
  return Profile;
};
