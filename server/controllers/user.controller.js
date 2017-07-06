'use strict';
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const { User, Profile, Guest, Event } = require('../../config/db');
const secret = require('./../../config/jwt.secretkey.json');
const { mailer, templates, messages, constants, password } = require('./../helper');
const signUp = require('../../config/mailerOptions.json').signUp;

const checkEventOwner = (eventId, reqOwner) =>
  Event.findById(eventId)
    .then(event => event.owner === reqOwner)
    .catch(error => error);

module.exports = {
  create(req, res) {
    const assignUser = Object.assign({}, req.body);
    const eventId = req.params.id;

    const guestsCreate = () => checkEventOwner(eventId, req.decoded.id)
    .then(isOwner => isOwner &&
      Promise.all(req.body.emails.map(email =>
        User.findOrCreate({
          where: {email},
          defaults: {
            email: email,
            password: password(),
            is_invited: true
          }
        })
        .spread((user, created) => {
          const guestData = {
            event_id: eventId,
            user_id: user.id
          };
          Guest.findOrCreate({
            where: guestData,
            defaults: guestData
          });
          return {id: user.id, email: user.email};
        })
      )) || res.status(403).send(messages.accessDenied))
      .then(guests => guests && res.status(201).send({guests}))
      .catch(error => res.status(400).send(messages.badRequest));

    eventId && guestsCreate() ||

    User.findOne({
      where: {
        email: req.body.email
      }
    })
    .then(user => {
      const dataActivation = user => {
        const token = jwt.sign({
          id: user.id,
          email: user.email
        }, secret.key, {expiresIn: constants.TIME.TOKEN});

        let data = Object.assign(signUp, {
          host: req.headers.host,
          route: constants.ROUTE.ACTIVATION,
          email: req.body.email,
          token: token
        });
        mailer(data, templates.activation);
        res.status(201).send(user);
      };
      if (user && user.is_invated) {
        User.updateAttributes(assignUser)
        .then(dataActivation)
        .catch(error => res.status(400).send(messages.badRequest));
      } else {
        User.create(assignUser)
        .then(dataActivation)
        .catch(error => res.status(422).send(messages.emailUsed));
      };
    })
    .catch(error => res.status(400).send(messages.badRequest));
  },

  retrieve(req, res) {
    User.findById(
      req.params.id, {
        attributes: [
          'email', 'profile_id'
        ]})
    .then(user => {
      user || res.status(404).send(messages.userNotFound);
      Profile.findById(
        user.profile_id, {
          attributes: [
            'first_name', 'last_name', 'avatar', 'birth_date', 'address', 'city', 'country'
          ]})
        .then(profile => {
          profile.dataValues.avatar = (profile.dataValues.avatar !== null ?
          profile.dataValues.avatar.toString() : profile.dataValues.avatar);
          profile || res.status(404).send(messages.profileError);
          (res.status(200).send(Object.assign({}, user.dataValues, profile.dataValues)));
        })
      .catch(error => res.status(400).send(messages.badRequest));
    })
    .catch(error => res.status(400).send(messages.badRequest));
  },

  destroy(req, res) {
    const {event_id: eventId, user_id: userId} = req.params;

    eventId && checkEventOwner(eventId, req.decoded.id)
      .then(isOwner => {
        isOwner && User.findById(userId)
        .then(user =>  !user.is_activate && user.destroy() ||
          Guest.findOne({
            where: {
              user_id: userId,
              event_id: eventId
            }
          }).then(guest => guest.destroy())
        )
        .then(() => res.status(200).send(messages.guestDeleted))
        .catch(error => res.status(404).send(messages.guestNotFound)) ||
          res.status(403).send(messages.accessDenied);
      }) ||

      User.findById(req.params.id)
      .then(user => {
        user && user.destroy();
      })
      .then(() => res.status(200).send(messages.userDeleted))
      .catch(error => res.status(404).send(messages.userNotFound));
  }
};
