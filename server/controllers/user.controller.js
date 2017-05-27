'use strict';

const User = require('../../config/db').Users;
const Profile = require('../../config/db').Profiles;

module.exports = {
  create(req, res) {
    return User
      .create({
        email: req.body.email,
        password: req.body.password,
        profile_id: req.body.profile_id,
        is_activate: req.body.is_activate
      })
      .then((user) => res.status(201).send(user))
      .catch((error) => res.status(400).send(error));
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
            message: 'User Not Found',
          });
        }
        return res.status(200).send(user);
      })
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return User
      .findById(req.params.id, {})
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return user
          .update({
            email: req.body.email || user.email,
            password: req.body.password || user.password,
            profile_id: req.body.profile_id || user.profile_id,
            is_activate: req.body.is_activate || user.is_activate,
            status_state: req.body.status_state || user.status_state,
          })
          .then(() => res.status(200).send(user))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  destroy(req, res) {
    return User
      .findById(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(400).send({
            message: 'User has not found. Please try again!',
          });
        }
        return user
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  }
};
