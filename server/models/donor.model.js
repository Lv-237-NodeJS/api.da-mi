'use strict';
module.exports = (sequelize, DataTypes) => {
  const Donor = sequelize.define('Donor', {
    gift_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
      timestamps: false,
      classMethods: {
        associate: models => {
          Donor.belongsTo(models.Gift, {
            foreignKey: 'id'
          });
          Donor.belongsTo(models.User, {
            foreignKey: 'id'
          });
        }
      }
    });
  return Donor;
};