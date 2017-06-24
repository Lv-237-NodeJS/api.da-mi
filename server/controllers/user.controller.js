'use strict';

const User = require('../../config/db').User;
const Profile = require('../../config/db').Profile;
const Guest = require('../../config/db').Guest;
const password = require('./../helper/passwordGenerator');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const secret = require('./../../config/jwt.secretkey.json');
const { mailer, messages, constants } = require('./../helper');

module.exports = {
  create(req, res) {
    let assignUser = Object.assign({}, req.body);
    const eventId = req.params.id;
    let users = [];
    if (eventId) {
    Promise.all(req.body.emails.map(email => {
      User.findOrCreate({
        where: {
          email: email
        },
        defaults: {
          email: email,
          password: password.passwordGenerate(),
          is_invited: true
        }
      })
      .spread((user, created) => {
        Guest.findOne({
          where: {
            user_id: user.id,
            event_id: eventId
          }
        })
        .then(guest => {
          !guest &&
          Guest.create({
            event_id: eventId,
            user_id: user.id
          });
        });
        return users.push(user);
      });
    }))
    .then(result => {
      console.log('RESULT', result);
      res.status(201).send(result);
    })
    .catch(error => res.status(400).send(messages.badRequest));
    } else {
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
          let data = {
            subject: messages.activation,
            img: 'activ.jpg',
            host: req.headers.host,
            route: constants.ROUTE.ACTIVATION,
            email: req.body.email,
            token: token
          };
          mailer(data, 'activation');
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
    }
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
      .catch(error => {
        return res.status(400).send(messages.badRequest);
      });
    })
    .catch(error => {
      return res.status(400).send(messages.badRequest);
    });
  },
  destroy(req, res) {
    const eventId = req.headers.referer.split('/')[4];
    eventId ?
      Guest.findOne({
        where: {
          user_id: req.params.id,
          event_id: eventId
        }
      })
      .then(guest => {
        guest && guest.destroy();
      })
      .then(() => {
        User.findById(req.params.id)
        .then(user =>
          !user.is_activate && user.destroy()
        );
        res.status(204).send('Guest was deleted');
      })
      .catch(error => {
        res.status(404).send(messages.userNotFound);
      }) :

    User.findById(req.params.id)
    .then(user => {
      user && user.destroy();
    })
    .then(() => {
      Guest.findAll({
        where: {
          user_id: req.params.id
        }
      })
      .then(guests => {
        guests.forEach(guest => guest && guest.destroy());
      });
    })
    .then(() => res.status(204).send('User was deleted'))
    .catch(error => {
      res.status(404).send(messages.userNotFound);
    });
  }
};
