'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('profile', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    }
    }, {
      timestamps: false,
      paranoid: true,
      underscored: true
    });
  return Profile;
};
