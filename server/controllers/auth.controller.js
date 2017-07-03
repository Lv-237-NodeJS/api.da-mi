'use strict';

const { User, Profile } = require('../../config/db');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const secret = require('./../../config/jwt.secretkey.json');
const { mailer, messages } = require('./../helper');
const activUser = require('../../config/activUserConfig.json').activUser;

module.exports = {
  login(req, res) {
    let token;
    let id;
    User.findOne({
      where: {
        email: req.body.email
      }
    })
    .then(user => {
      (!user || !passwordHash.verify(req.body.password, user.password)) &&
        res.status(401).send(messages.loginDataNotValid) || !user.is_activate &&
          res.status(401).send(messages.userIsNotActivated) ||
            (id = user.id) &&
              (token = jwt.sign({id}, secret.key, {expiresIn: '2h'})) &&
                res.status(200).json({'token': token, 'user_id': id});
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
