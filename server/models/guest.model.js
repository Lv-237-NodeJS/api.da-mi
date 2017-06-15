'use strict';

module.exports = function(sequelize, DataTypes) {
  const Guest = sequelize.define('Guest', {
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false
    },
    status: {
      type: DataTypes.ENUM,
      values: ['going', 'notgoing', 'maybe'],
      defaultValue: null,
      allowNull: true
    }
  }, {
    paranoid: false,
    timestamps: false,
    classMethods: {
      associate: models => {
        Guest.belongsTo(models.User, {
          foreignKey: 'id',
          hooks: true
        });
        Guest.hasMany(models.Event, {
          foreignKey: 'id'
        });
      }
    },
    hooks: {
      beforeCreate: (guest, options) => {
        guest.createdAt = new Date().getTime();
        guest.updatedAt = new Date().getTime();
      },
      beforeUpdate: (guest, options) => {
        guest.updatedAt = new Date().getTime();
      }
    }
  });
  return Guest;
};
