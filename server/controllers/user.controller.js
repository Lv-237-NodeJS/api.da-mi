'use strict';

const User = require('../../config/db').User;
const passwordHash = require('password-hash');

module.exports = {
  create(req, res) {
    let assignUser = Object.assign({}, req.body);

    User.hook('afterValidate', (user, options) => {
       user.password = passwordHash.generate(user.password);
    });

    User.create(assignUser)
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400)).send(error);
  }
};
