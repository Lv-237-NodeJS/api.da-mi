'use strict';

const passwordHash = require('password-hash');

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
          is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,20}$/
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
    },
    createdAt: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    is_invited: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  }, {
    paranoid: false,
    timestamps: false,
    classMethods: {
      associate: models => {
        User.hasOne(models.Profile, {
          foreignKey: 'id',
          onDelete: 'CASCADE',
          hooks: true
        });
        User.hasMany(models.Event, {
          foreignKey: 'id'
        });
      }
    },
    hooks: {
      beforeCreate: (user, options) => {
        user.password = passwordHash.generate(user.password);
        user.createdAt = new Date().getTime();
        user.updatedAt = new Date().getTime();
      },
      beforeUpdate: (user, options) => {
        user.updatedAt = new Date().getTime();
      }
    }
  });
  return User;
};
