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
          allowNull: false,
          validate: {
            isEmail: true
          }
        },
        password: {
          type: DataTypes.TEXT, 
          allowNull: false,
          validate: {
            len: [8,30]
          }
        }, 
        profile_id: { 
          type: DataTypes.INTEGER
        }, 
        is_activate: { 
          type: DataTypes.BOOLEAN, 
          allowNull: false 
        }, 
        status_user_state: { 
            type: DataTypes.STRING 
        } 
        }, { 
            timestamps: false,
            paranoid: true,
            underscored: true 
        });
    return User;
};