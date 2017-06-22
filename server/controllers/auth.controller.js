'use strict';

const User = require('../../config/db').User;
const Profile = require('../../config/db').Profile;
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const secret = require('./../../config/jwt.secretkey.json');
const { mailer, messages } = require('./../helper');
const activUser = require('../../config/activUserConfig.json').activUser;

module.exports = {
  login(req, res) {
    User.findOne({where: {email: req.body.email}}).then(user => {
      if (!user || !passwordHash.verify(req.body.password, user.password)) {
        res.status(401).send('Email or password is not valid');
      } else {
        const token = jwt.sign({
          id: user.id
        }, secret.key, {expiresIn: '2h'});
        res.json({'token': token, 'user_id': user.id});
      }
    })
    .catch(error => res.status(401).send(error));
  },

  activation(req, res) {
    let token = req.params.token;
    let decoder;
    try {
      decoder = jwt.verify(token, secret.key);
    } catch (err) {
      res.status(498).send(messages.linkNotValid);
    }
    User.findOne({
      where: {
        id: decoder.id
      }
    })
    .then(user => {
      if (!user) {
        res.status(404).send(messages.userNotFound);
      } else {
        if (user.is_activate) {
          res.status(418).send(messages.linkAlreadyActivated);
        } else {
          Profile.create()
          .then(result => {
            User.findById(decoder.id)
            .then(user => {
              user.update({
                profile_id: result.dataValues.id,
                is_activate: true
              });
              activUser.email = decoder.email;
              mailer(activUser, 'activated');
              res.status(200).send(messages.congratulation);
            });
          })
          .catch(error => res.status(400).send(error));
        }
      }
    });
  }
};
