'use strict';

module.exports = function(sequelize, DataTypes) {
  const Profile = sequelize.define('Profile', {
    first_name: {
      type: Sequelize.STRING,
      allowNull: false,
      max: 50
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: false,
      max: 50
    },
    avatar: {
      type: Sequelize.BLOB,
      max: 65000
    }
  }, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Profile;
};
