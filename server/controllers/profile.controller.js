'use strict';

const profile = require('../models').profile;

module.exports = {
  retrieve(req, res) {
    return profile
    .findById(req.params.id, {
      include: [{
        model: profile,
        as: 'profiles',
      }]
    })
    .then(profile => {
      if (!profile) {
        return res.status(404).send({
          message: 'Profile Not Found',
        });
      }
      return res.status(200).send(profile);
    })
    .catch(error => res.status(400).send(error));
  },
  
  update(req, res) {
    return profile
    .findById(req.params.id, {
      include: [{
        model: profile,
        as: 'profiles',
      }],
    })
    .then(profile => {
      if (!profile) {
        return res.status(404).send({
          message: 'Profile Not Found',
        });
      }
      return profile
      .update({
        first_name: req.body.first_name || profiles.first_name,
        last_name: req.body.last_name || profiles.last_name,
      })
      .then(() => res.status(200).send(profile))
      .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  }
};
