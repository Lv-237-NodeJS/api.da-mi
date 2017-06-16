'use strict';

const User = require('../../config/db').User;
const Profile = require('../../config/db').Profile;
const Guest = require('../../config/db').Guest;
const password = require('./../helper/passwordGenerator');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const secret = require('./../../config/jwt.secretkey.json');
const { mailer } = require('./../helper');
const message = require('./../helper/message');
const constant = require('./../helper/constant');

module.exports = {
  create(req, res) {
    let assignUser = Object.assign({}, req.body);
    const eventId = req.body.eventId;
    eventId ?
      req.body.emails.map(email => {
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
              user_id: user.id
            }
          })
          .then(guest => {!guest &&
            Guest.create({
              event_id: eventId,
              user_id: user.id
            });
          });
        });
      }) :
    User.findOne({
      where: {
        email: req.body.email
      }
    })
    .then(user => {
      let assignUser = Object.assign({}, req.body);
      let dataActivation = user => {
        let token = jwt.sign({
          id: user.id,
          email: user.email
        }, secret.key, {expiresIn: constant.TIME.TOKEN});
        let data = {
          subject: message.activation,
          img: 'activ.jpg',
          host: req.headers.host,
          route: constant.ROUTE.ACTIVATION,
          email: req.body.email,
          token: token
        };
        mailer(data, 'activation');
        res.status(201).send();
      };
      if (user) {
        if (!user.is_invated) {
          res.status(422).send(message.emailUsed);
        } else {
          User.updateAttributes(assignUser)
          .then(dataActivation)
          .catch(error => res.status(400).send(error));
        }
      } else {
        User.create(assignUser)
        .then(dataActivation)
        .catch(error => res.status(400).send(error));
      };
    })
    .catch(error => res.status(422).send(message.emailUsed));
  },
  retrieve(req, res) {
    User.findById(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(404).send({message: 'User Not Found'});
      }
      Profile.findById(user.profile_id).then(profile => {
        if (!profile) {
          return res.status(404).send({message: 'Profile Not Found'});
        }

        const data = Object.assign({}, {email: user.email,
          firstName: profile.first_name,
          lastName: profile.last_name,
          avatar: profile.avatar,
          birthdate: profile.birth_date,
          address: profile.address,
          city: profile.city,
          country: profile.city
        });
        return res.status(200).send(data);
      })
      .catch(error => {
        return res.status(400).send(error);
      });
    })
    .catch(error => {
      return res.status(400).send(error);
    });
  },
  destroy(req, res) {
    User.findById(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: 'User has not found. Please try again!'
        });
      }
      return user
      .destroy()
      .then(user => res.status(204).send(user))
      .catch(error => res.status(404).send(error));
    })
    .catch(error => res.status(404).send(error));
  }
};
