'use strict';

const { hooks } = require('./../helper');

module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    avatar: {
      type: DataTypes.BLOB,
      validate: {
        max: 65000
      }
    },
    birth_date: {
      type: DataTypes.DATEONLY
    },
    address: {
      type: DataTypes.STRING(255)
    },
    city: {
      type: DataTypes.STRING(100)
    },
    country: {
      type: DataTypes.STRING(100)
    },
    createdAt: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    timestamps: false,
    hooks: {
      beforeCreate: hooks.beforeCreate,
      beforeUpdate: hooks.beforeUpdate
    }
  });
  return Profile;
};
