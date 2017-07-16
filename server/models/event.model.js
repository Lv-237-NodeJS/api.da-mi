'use strict';

const { hooks } = require('./../helper');

module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date_event: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    owner: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    location_name: {
      type: DataTypes.STRING
    },
    longitude: {
      type: DataTypes.FLOAT
    },
    latitude: {
      type: DataTypes.FLOAT
    },
    description: {
      type: DataTypes.TEXT
    },
    status_event: {
      type: DataTypes.ENUM,
      values: ['draft', 'public', 'finished'],
      defaultValue: 'draft',
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
    timestamps: false,
    hooks: {
      beforeCreate: hooks.beforeCreate,
      beforeUpdate: hooks.beforeUpdate
    }
  });
  return Event;
};
