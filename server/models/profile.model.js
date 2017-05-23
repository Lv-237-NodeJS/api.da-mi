'use strict';

module.exports = function(sequelize, DataTypes) {
  const Profile = sequelize.define('Profile', {
    first_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    last_name: {
      type: Sequelize.STRING
    },
    avatar: {
      type: Sequelize.BLOB
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
