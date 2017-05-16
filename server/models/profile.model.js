'use strict';

module.exports = (sequelize, DataTypes) => {
   const Profile = sequelize.define('profile', {
    ID: {
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
    },
    user_id: {
      type: DataTypes.INTEGER
    },
  }, {
    timestamps: false,
    paranoid: true,
    underscored: true

  });
  return Profile;
};
