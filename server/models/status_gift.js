'use strict';

module.exports = (sequelize, DataTypes) => {
  const GiftStatus = sequelize.define('GiftStatus', {
    name: {
      type: DataTypes.STRING(35),
      allowNull: false
    }
  }, {
    paranoid: false,
    timestamps: false
  });
  return GiftStatus;
};
