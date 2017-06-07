'use strict';

module.exports = (sequelize, DataTypes) => {
  const statusEvent = sequelize.define('statusEvent', {
    name: {
      type: DataTypes.STRING(35),
      allowNull: false
    }
  }, {
    paranoid: false,
    timestamps: false
  });
  return statusEvent;
};
