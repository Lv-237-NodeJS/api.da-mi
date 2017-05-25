'use strict';

const Profile = require('../models/profile.model');

module.exports = {
  retrieve(req, res) {
    return profiles
    .findById(req.params.id, {
      include: [{
        model: Profile,
        as: 'profiles',
      }],
    })
    .then(Profile => {
      if (!Profile) {
        return res.status(404).send({
          message: 'Profile Not Found',
        });
      }
      return res.status(200).send(profile);
    })
    .catch(error => res.status(400).send(error));
  },
  
  update(req, res) {
    return Profile
    .findById(req.params.id, {
      include: [{
        model: Profile,
        as: 'profiles',
      }],
    })
    .then(Profile => {
      if (!Profile) {
        return res.status(404).send({
          message: 'Profile Not Found',
        });
      }
      return Profile
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
