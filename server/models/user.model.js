'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.VIRTUAL,
      allowNull: false
    },
    profile_id: {
      type: DataTypes.INTEGER
    },
    is_activate: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    status_state: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false,
    underscored: true
  });

  return User;
};
