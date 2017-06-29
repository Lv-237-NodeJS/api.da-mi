'use strict';

const User = require('../../config/db').User;
const Profile = require('../../config/db').Profile;
const Gift = require('../../config/db').Gift;
const Event = require('../../config/db').Event;
const Comment = require('../../config/db').Comment;
const { mailer, messages } = require('./../helper');
const { HOST, PORT } = require('./../helper/constants');
const URL = HOST + PORT;

module.exports = {
  create(req, res) {
    let assignComment = Object.assign({}, req.body, {gift_id: req.params.gift_id},
      {event_id: req.params.id}, {user_id: req.decoded.id});
    !!req.body.parent_id && (
      Comment.findById(req.body.parent_id, {
        include: [{
          model: User,
          attributes: ['email'],
          include: [{
            model: Profile,
            attributes: ['first_name', 'last_name'],
          }],
        },{model: Gift}]
      })
      .then(comment => {
          const {first_name: firstName, last_name: lastName} = comment.User.Profile || '';
          const template = 'commentReply';
          const subject = 'Comment Reply Notification';
          const route = `/events/${req.params.id}/gift/${comment.gift_id}`;

          mailer({
            host: URL,
            subject: subject,
            route: route,
            firstname: firstName,
            lastname: lastName,
            email: comment.User.email,
            giftName: comment.Gift.name,
            img: 'party.jpg'
          }, template);
        }));
    Comment.create(assignComment)
    .then(comment => res.status(201).send(comment))
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
