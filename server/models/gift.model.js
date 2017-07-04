'use strict';

module.exports = (sequelize, DataTypes) => {
  const Gift = sequelize.define('Gift', {
    name: {
      type: DataTypes.STRING(35),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    image: {
      type: DataTypes.BLOB,
      validate: {
        max: 65000
      }
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
    status: {
      type: DataTypes.ENUM,
      values: ['hasOneDonor', 'hasMultipleDonors'],
      defaultValue: 'hasOneDonor',
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
