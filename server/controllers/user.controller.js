'use strict';

const User = require('../../config/db').Users;
const bcrypt = require('bvrypt');
const rounds = 8;

module.exports = {
  create(req, res) {
    let assignUser = Object.assign({}, req.body);

    User.hook('afterValidate', (user, options) => {
       user.password = bcrypt.hashSync(user.password, rounds);
    });

    User.create(assignUser)
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400)).send(error);
  }
};
