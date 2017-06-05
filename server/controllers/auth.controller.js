'use strict';

const User = require('../../config/db').User;
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const secret = require('./../../config/jwt.secretkey.json');

module.exports = {
  login(req, res) {
    User.findOne({where: {email: req.body.email}}).then(user => {
      if (!user || !passwordHash.verify(req.body.password, user.password)) {
        res.status(401).send('Email or password is not valid');
      } else {
        const token = jwt.sign({
          id: user.id
        }, secret.key, {expiresIn: '2h'});
        res.json({'token': token});
      }
    })
    .catch(error => res.status(401).send(error));
  }
};
