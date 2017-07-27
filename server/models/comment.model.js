'use strict';


/*const p = require.resolve('./../helper');
console.log("FFF", p);
const t = require("C:/Users/Ivan/Desktop/B-E/api.da-mi/server/helper/index.js");
console.log("FFF", t);*/

const { hooks } = require('./../helper');

//console.log("comment");
// console.log(__filename);
// console.log(__dirname);
// console.log(hooks);
// console.log(require(require.resolve('./../helper')));
//console.log("comment");

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    gift_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: true
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
    classMethods: {
      associate: models => {
        Comment.belongsTo(models.User, {
          foreignKey: 'user_id',
        });
        Comment.belongsTo(models.Gift, {
          foreignKey: 'gift_id'
        });
      }
    },
    hooks: {
      beforeCreate: hooks.beforeCreate,
      beforeUpdate: hooks.beforeUpdate
    }
  });
  return Comment;
};
