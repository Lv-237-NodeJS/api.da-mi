'use strict';

const { Profile } = require('../../config/db');
const { messages } = require('./../helper');

module.exports = {
  retrieve(req, res) {
    Profile.findById(req.params.id)
    .then(profile => {
      !!profile && res.status(200).send(profile) ||
      res.status(404).json({
        'message': messages.profileError,
        'view': messages.danger
      });
    })
    .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    Profile.findById(req.params.id)
    .then(profile => {
      profile || res.status(404).json(messages.profileError);
      profile.updateAttributes(Object.assign({}, req.body))
      .then(profile => res.status(200).json({
        'profile': profile,
        'message': messages.profileUpdate,
        'view': messages.success
      }))
      .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  }
};
