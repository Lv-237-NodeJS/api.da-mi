'use strict';

const User = require('../../config/db').User;
const Profile = require('../../config/db').Profile;
const Gift = require('../../config/db').Gift;
const Event = require('../../config/db').Event;
const Comment = require('../../config/db').Comment;
const messages = require('../helper/messages');
const mailer = require('./../helper/mailer');
const { HOST, PORT } = require('./../helper/constants');
const URL = HOST + PORT;

module.exports = {
  create(req, res) {

    let assignComment = Object.assign({}, req.body, {gift_id: req.params.gift_id},
      {event_id: req.params.id}, {user_id: req.decoded.id});
    if (!!req.body.parent_id) {
      Comment.findAll({
        where: {
          id: req.body.parent_id
        },
        include: [{
          model: User,
          attributes: ['email'],
          include: [{
            model: Profile,
            attributes: ['first_name', 'last_name'],
          }],
        },{model: Gift}]
      })
      .then(items => {
        items.map(item => {
          const firstname = item.User.Profile ? item.User.Profile.first_name : '';
          const lastname = item.User.Profile ? item.User.Profile.last_name : '';
          const template = 'commentReply';
          const subject = 'Comment Reply Notification';
          const route = `/events/${req.params.id}/gift/${item.gift_id}`;

          mailer.send({
            host: URL,
            subject: subject,
            route: route,
            firstname: firstname,
            lastname: lastname,
            email: item.User.email,
            giftName: item.Gift.name,
            img: 'party.jpg'
          }, template);
        });
      });
    }
    Comment.create(assignComment)
    .then(comment => {
      return res.status(201).send(comment);
    })
    .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    Comment.findAll({
      where: {
        gift_id: req.params.id
      },
      include: [{
        model: User,
        attributes: ['email'],
        include: [{
          model: Profile,
          attributes: ['first_name', 'last_name'],
        }],
      }]
    })
    .then(comments => res.status(200).send({comments: comments}))
    .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    Comment.findById(req.params.comment_id)
    .then(comment => {
      if (comment.dataValues.user_id !== req.decoded.id || !comment) {
        return res.status(404).send(messages.commentNotFound);
      }
      let updatedComment = Object.assign({}, req.body);
      return comment.updateAttributes(updatedComment)
      .then(comment => res.status(200).send(comment))
      .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  },

  destroy(req, res) {
    Comment.findById(req.params.comment_id)
    .then(comment => {
        if (comment.dataValues.user_id !== req.decoded.id || !comment) {
          return res.status(404).send(messages.commentNotFound);
        }
        return comment
          .destroy()
          .then(comment => res.status(204).send(messages.commentDeleted))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};
