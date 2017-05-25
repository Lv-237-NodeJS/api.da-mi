'use strict';

module.exports  = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [6,20]
      }
    },
    profile_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    is_activate: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    status_state: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    paranoid: false,
    underscored: true,
    classMethods: {
      associate: (models) => {
        User.hasOne(models.Profiles, {
          foreignKey: 'profile_id'
        });
      }
    }
  });
  return User;
};