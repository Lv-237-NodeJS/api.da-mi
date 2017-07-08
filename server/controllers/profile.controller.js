'use strict';

const { Profile } = require('../../config/db');
const { messages } = require('./../helper');

module.exports = {
  retrieve(req, res) {
    Profile.findById(req.params.id)
    .then(profile => {
      profile || res.status(404).json(messages.profileError);
      res.status(200).send(profile);
    })
    .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    // const updateProfile = Object.assign({}, req.body);

    Profile.findById(req.params.id)
    .then(profile => {
      profile || res.status(404).json(messages.profileError);
      profile.updateAttributes(Object.assign({}, req.body))
      .then(() => res.status(200).send(profile))
      .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  }
};
