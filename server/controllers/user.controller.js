'use strict';
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const { User, Profile, Guest, Event } = require('../../config/db');
const secret = require('./../../config/jwt.secretkey.json');
const { mailer, templates, messages, constants, password } = require('./../helper');
const signUp = require('../../config/mailerOptions.json').signUp;

const pattern = {
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-]).{6,20}$/
};

const checkEventOwner = (eventId, reqOwner) =>
  Event.findById(eventId)
    .then(event => event.owner === reqOwner);

const findOrCreateGuest = (eventId, user) => {
  const guestData = {
    event_id: eventId,
    user_id: user.id
  };
  Guest.findOrCreate({
    where: guestData,
    defaults: guestData
  });
};

const findOrCreateUser = email =>
  User.findOrCreate({
    where: {email},
    defaults: {
      email,
      password: passwordHash.generate(password()),
      is_invited: true
    }
  });

const deleteGuest = (userId, eventId) =>
  Guest.findOne({
    where: {
      user_id: userId,
      event_id: eventId
    }
  }).then(guest => guest.destroy());

const signToken = (id, email) =>
  jwt.sign({id, email}, secret.key, {expiresIn: constants.ACTIVATION_TOKEN});

module.exports = {
  create(req, res) {
    const eventId = req.params.id;
    const assignUser = Object.assign({}, req.body);
    
    if (assignUser.password) {
      const checkValidatePassword = assignUser.password.match(pattern.password);
      if (!checkValidatePassword) 
        return res.status(400).json({'message': messages.invalidPassword});
      assignUser.password = passwordHash.generate(assignUser.password);
    };

    const guestsCreate = () =>
      checkEventOwner(eventId, req.decoded.id)
      .then(isOwner => isOwner &&
        Promise.all(req.body.emails.map(email =>
          findOrCreateUser(email)
          .spread(user => (
            findOrCreateGuest(eventId, user),
            {id: user.id, email: user.email}
          ))
        )) || res.status(403).json({'message': messages.accessDenied}))
        .then(guests => guests && res.status(201).send({guests}))
        .catch(() => res.status(400).json({'message': messages.badRequest}));

    eventId && guestsCreate() ||
    User.findOne({
      where: {
        email: req.body.email
      }
    })
    .then(user => {
      const dataActivation = user => {
        const data = Object.assign(signUp, {
          host: constants.BACKEND_URL,
          route: constants.ROUTE.ACTIVATION,
          email: req.body.email,
          token: signToken(user.id, user.email)
        });
        mailer(data, templates.activation);
        res.status(201).json({'user': user, 'message': messages.successSignup});
      };
      user && user.is_invited && (user.is_activate == false) &&
      user.updateAttributes(assignUser)
      .then(user => dataActivation(user))
      .catch((err) => res.status(400).send(err)) ||
      User.create(assignUser)
      .then(user => dataActivation(user))
      .catch(() => res.status(422).json({'message': messages.emailUsed}));
    })
    .catch(() => res.status(404).json({'message': messages.userNotFound}));
  },

  retrieve(req, res) {
    User.findById(
      req.params.user_id, {
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
      .catch(() => res.status(400).json(messages.badRequest));
    })
    .catch(() => res.status(400).json(messages.badRequest));
  },

  destroy(req, res) {
    const {event_id: eventId, user_id: userId} = req.params;

    eventId &&
    checkEventOwner(eventId, req.decoded.id)
    .then(isOwner => {
      isOwner && User.findById(userId)
      .then(user => !user.is_activate && user.destroy() || deleteGuest(userId, eventId))
      .then(() => res.status(200).json({'message': messages.guestDeleted}))
      .catch(() => res.status(404).json({'message': messages.guestNotFound})) ||
        res.status(403).json({'message': messages.accessDenied});
    }) ||

    User.findById(userId)
    .then(user => user && user.destroy())
    .then(() => res.status(200).json({'message': messages.userDeleted}))
    .catch(() => res.status(404).json({'message': messages.userNotFound}));
  }
};
