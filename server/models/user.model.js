'use strict';

module.exports  = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
          is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/i,
          len: [6,20]
        }
    },
    profile_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    is_activate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  }, {
    paranoid: false,
    classMethods: {
      associate: models => {
        User.hasOne(models.Profile, {
          foreignKey: 'profile_id',
          onDelete: 'cascade'
        });
      }
    }
  });
  return User;
};
