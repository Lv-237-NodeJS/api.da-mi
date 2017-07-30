'use strict';
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const { User, Profile, Guest, Event } = require('../../config/db');
const secret = require('./../../config/jwt.secretkey.json');
const { mailer, templates, messages, constants, password } = require('./../helper');
const signUp = require('../../config/mailerOptions.json').signUp;

const patterns = {
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-]).{6,20}$/
};

const eventIsDraft = eventId =>
  Event.findOne({where: {id: parseInt(eventId, 10), status_event: 'draft'}})
  .then(event => !!event);

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

const hasPassword = assignUser => {
  if (assignUser.password) {
    if (!assignUser.password.match(patterns.password)) {
      return false;
    }
    assignUser.password = passwordHash.generate(assignUser.password);
  };
  return true;
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

const validUser = (password, user) =>
  (user && passwordHash.verify(password, user.password)) && true || false;

module.exports = {
  create(req, res) {
    const eventId = req.params.id;
    const assignUser = Object.assign({}, req.body);

    (!hasPassword(assignUser)) && res.status(400).json({
      'message': messages.invalidPassword,
      'view': messages.danger
    });

    const guestsCreate = () =>
      eventIsDraft(eventId).then(out => !!out &&
      checkEventOwner(eventId, req.decoded.id)
      .then(isOwner => isOwner &&
        Promise.all(req.body.emails.map(email =>
          findOrCreateUser(email)
          .spread(user => (
            findOrCreateGuest(eventId, user),
            {id: user.id, email: user.email}
          ))
        ))) ||
        res.status(403).json({
          'message': messages.accessDenied,
          'view': messages.danger
        }))
        .then(guests => guests && res.status(201).json({
          'guests': guests,
          'message': messages.guestAdd,
          'view': messages.success
        }))
        .catch(() => res.status(400).json({
          'message': messages.badRequest,
          'view': messages.danger
        }));

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
        res.status(201).json({
          'user': user,
          'message': messages.successSignup,
          'view': messages.success
        });
      };
      user && user.is_invited && (user.is_activate == false) &&
      user.updateAttributes(assignUser)
      .then(user => dataActivation(user))
      .catch(() => res.status(400).json({
        'message': messages.badRequest,
        'view': messages.danger
      })) ||
      User.create(assignUser)
      .then(user => dataActivation(user))
      .catch(() => res.status(422).json({
        'message': messages.emailUsed,
        'view': messages.danger
      }));
    })
    .catch(() => res.status(404).json({
      'message': messages.userNotFound,
      'view': messages.danger
    }));
  },

  update(req, res) {
    const assignUser = Object.assign({}, {password: req.body.newPassword}, {id: req.decoded.id});
    (!hasPassword(assignUser)) && res.status(400).json({
      'message': messages.invalidPassword,
      'view': messages.danger
    });
    User.findById(req.decoded.id)
    .then(user => {
      validUser(req.body.oldPassword, user) &&
      user.updateAttributes(assignUser) &&
      res.status(200).json({
        'message': messages.resetPassword,
        'view': messages.success
      }) || res.status(400).json({
        'message': messages.invalidUpdate,
        'view': messages.danger
      });
    })
    .catch(() => res.status(404).json({
      'message': messages.userNotFound,
      'view': messages.danger
    }));
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
      isOwner &&
      eventIsDraft(eventId).then(out => !!out &&
      User.findById(userId)
      .then(user =>
      !user.is_activate && user.destroy() || deleteGuest(userId, eventId))
      .then(() => res.status(200).json({
        'message': messages.guestDeleted,
        'view': messages.success
      }))
      .catch(() => res.status(404).json({
        'message': messages.guestNotFound,
        'view': messages.danger
      })) ||
      res.status(403).json({
        'message': messages.accessDenied,
        'view': messages.danger
      }));
    }) ||

    User.findById(userId)
    .then(user => user && user.destroy())
    .then(() => res.status(200).json({
      'message': messages.userDeleted,
      'view': messages.success
    }))
    .catch(() => res.status(404).json({
      'message': messages.userNotFound,
      'view': messages.danger
    }));
  }
};
