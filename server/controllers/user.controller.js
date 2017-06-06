'use strict';

const User = require('../../config/db').User;

module.exports = {
  create(req, res) {
    let assignUser = Object.assign({}, req.body);

    User.create(assignUser)
    .then(user => res.status(201).send(user))
    .catch(error => res.status(400).send(error));
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
