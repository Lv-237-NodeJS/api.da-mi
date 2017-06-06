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
    .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return User.findById(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(404).send({message: 'User Not Found'});
      }
      User.findById(user.profile_id).then(profile => {
        return res.status(200).send({
          first_name: profile.first_name,
          last_name: profile.last_name,
          avatar: profile.avatar
        });
      });
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
