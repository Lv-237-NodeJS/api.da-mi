'use strict';

module.exports = function(sequelize, DataTypes) {
  var Profile = sequelize.define('Profile', {
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    avatar: {
      type: DataTypes.BLOB,
      validate: {
        max: 65000
      }
    },
    birth_date: {
      type: DataTypes.DATE
    },
    address: {
      type: DataTypes.STRING(255)
    },
    city: {
      type: DataTypes.STRING(100)
    },
    country: {
      type: DataTypes.STRING(100)
    }
  }, {
    paranoid: false,
    timestamps: true
  });
  return Profile;
};
