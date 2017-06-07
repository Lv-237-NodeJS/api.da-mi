'use strict';

module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
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
    paranoid: false,
    timestamps: false,
    hooks: {
      beforeCreate: (profile, options) => {
        profile.createdAt = new Date().getTime();
        profile.updatedAt = new Date().getTime();
      },
      beforeUpdate: (profile, options) => {
        profile.updatedAt = new Date().getTime();
      }
    }
  });
  return Profile;
};
