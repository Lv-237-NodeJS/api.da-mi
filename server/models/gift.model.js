'use strict';

module.exports = (sequelize, DataTypes) => {
  const Gift = sequelize.define('Gift', {
    name: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    link: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    is_available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },
    status_gift_id: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false
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
    classMethods: {
      associate: models => {
        Gift.hasOne(models.Event, {
          foreignKey: 'id',
          hooks: true
        });
        // Gift.hasOne(models.GiftStatus, {
        //   foreignKey: 'id',
        //   onDelete: 'CASCADE',
        //   hooks: true
        // });
      }
    },
    hooks: {
      beforeCreate: (gift, options) => {
        gift.createdAt = new Date().getTime();
        gift.updatedAt = new Date().getTime();
      },
      beforeUpdate: (gift, options) => {
        gift.updatedAt = new Date().getTime();
      }
    }
  });
  return Gift;
};
