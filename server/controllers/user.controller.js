'use strict';

const User = require('../../config/db').Users;
const Profile = require('../../config/db').Profiles;
const bcrypt = require('bcrypt');

module.exports = {
  create(req, res) {
    let assignUser = Object.assign({}, req.body);
    Profile.create();
    return User
      .create(assignUser)
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return User
      .findAll({
        order: [
          ['created_at', 'ASC']
        ],
      })
      .then(users => res.status(200).send(users))
      .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    return User
      .findById(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User has not found. Please ty again!'
          });
        }
        return res.status(200).send(user);
      })
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return User
      .findById(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User has not found. Please ty again!'
          });
        }
        let assignUser = Object.assign({}, req.body);
        return user
          .update(assignUser || user)
          .then(user => res.status(200).send(user))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  destroy(req, res) {
    return User
      .findById(req.params.id)
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
