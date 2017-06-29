'use strict';

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
      allowNull: true
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
    paranoid: false,
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
      beforeCreate: (comment, options) => {
        comment.createdAt = new Date().getTime();
        comment.updatedAt = new Date().getTime();
      },
      beforeUpdate: (comment, options) => {
        comment.updatedAt = new Date().getTime();
      }
    }
  });
  return Comment;
};
