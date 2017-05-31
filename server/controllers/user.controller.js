'use strict';

const User = require('../../config/db').Users;

module.exports = {
  create(req, res) {
    let assignUser = Object.assign({}, req.body);
    User.create(assignUser)
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400)).send(error);
  }
};
