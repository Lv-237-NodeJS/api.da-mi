'use strict';

const { User, Profile } = require('../../config/db');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const secret = require('./../../config/jwt.secretkey.json');
const { mailer, messages, constants } = require('./../helper');
const activUser = require('../../config/activUserConfig.json').activUser;

const validUser = (password, user) =>
  (user && passwordHash.verify(password, user.password)) && true || false;

const signToken = id =>
  jwt.sign({id}, secret.key, {expiresIn: constants.TIME.LOGIN_TOKEN});

module.exports = {
  login(req, res) {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
    .then(user => {
      !validUser(req.body.password, user) &&
      res.status(401).json({'message': messages.loginDataNotValid}) ||
      !user.is_activate && res.status(401).json({'message': messages.userIsNotActivated}) ||
      res.status(200).json({
        'token': signToken(user.id),
        'user_id': user.id,
        'profile_id': user.profile_id
      });
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
