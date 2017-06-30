'use strict';

const { User, Profile, Gift, Event, Comment } = require('../../config/db');
const { mailer, messages } = require('./../helper');
const { URL } = require('./../helper/constants');

module.exports = {
  create(req, res) {
    let commentParams = Object.assign({}, req.body, {gift_id: req.params.gift_id},
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
    Comment.create(commentParams)
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
    Comment.findOne({
      where: {
        id: req.params.comment_id,
        $and: {user_id: req.decoded.id}
      }
    })
    .then(comment =>
      !comment && res.status(404).send(messages.commentNotFound) ||      
      comment.updateAttributes(Object.assign({}, req.body))
      .then(comment => res.status(200).send(comment))
      .catch(error => res.status(400).send(error))
    )
    .catch(error => res.status(400).send(error));
  },

  destroy(req, res) {   
    Comment.findOne({
      where: {
        id: req.params.comment_id,
        $and: {user_id: req.decoded.id}
      }
    })
    .then(comment =>
      !comment && res.status(404).send(messages.commentNotFound) ||
      comment.destroy()
      .then(comment => res.status(204).send(messages.commentDeleted))
      .catch(error => res.status(400).send(error))
    )      
  }
};
