'use strict';
const jwt = require('jsonwebtoken');
const secret = require('./../../config/jwt.secretkey.json')
const user = {};
user.email = 'test@test.com';
user.password = 111;
user.id = 1;

module.exports = {

  login (req, res) {
    if (req.body.email == user.email && req.body.password == user.password ) {
      const token = req.session.token = jwt.sign({
        email: req.body.email,
        id: user.id
        }, secret.key);
      res.json({'token': token});
    } else {
      res.status('401').send('Email or password is not valid.');
    }
  }
};
