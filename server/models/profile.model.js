'use strict';

module.exports = function(sequelize, DataTypes) {
  const Profile = sequelize.define('Profile', {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      max: 50
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      max: 50
    },
    avatar: {
      type: DataTypes.BLOB,
      max: 65000
    },
    birth_date: {
      type: DataTypes.DATE
    },
    address: {
      type: DataTypes.STRING,
      validate: {
        max: 200
      } 
    },
    city: {
      type: DataTypes.STRING,
      max: 200
    },
    country: {
      type: DataTypes.STRING,
      max: 200
    }
  }, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    classMethods: {
      associate: (models) => {
        Profile.belongsTo(models.User, {
          foreignKey: 'profile_id',
          onDelete: 'CASCADE',
        });
      },
    },
  });
  return Profile;
};
