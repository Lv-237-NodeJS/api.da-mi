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
          is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/i,
          min: 6
        }
    },
    profile_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    is_activate: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  }, {
    paranoid: false,
    underscored: true,
    classMethods: {
      associate: models => {
        User.hasOne(models.Profiles, {
          foreignKey: 'profile_id'
        });
      }
    }
  });
  return User;
};
