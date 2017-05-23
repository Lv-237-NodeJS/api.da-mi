'use strict';

module.exports = function(sequelize, DataTypes) {
  const Profile = sequelize.define('Profile', {
    first_name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        max: 250
      }
    },
    last_name: {
      type: Sequelize.STRING,
      validate: {
        max: 256
      }
    },
    avatar: {
      type: Sequelize.BLOB,
      validate: {
        max: 16777215
      }
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
