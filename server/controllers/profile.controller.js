'use strict';

// const Profile = require('../models/profile.model');
const Profile = require('../../config/db').Profile;

module.exports = {
  retrieve(req, res) {
    return Profile.findById(req.params.id)
    .then(profile => {
      if (!profile) {
        return res.status(404).send({ message: 'Profile Not Found'});
      }
      return res.status(200).send(profile);
    })
    .catch(error => res.status(400).send(error));
  },
  
  update(req, res) {
    return Profile.findById(req.params.id)
    .then(profile => {
      if (!profile) {
        return res.status(404).send({
          message: 'Profile Not Found',
        });
      }
      return profile.update({
        first_name: req.body.first_name || profile.first_name,
        last_name: req.body.last_name || profile.last_name,
        address: req.body.address || profile.address,
        city: req.body.city || profile.city,
        country: req.body.country || profile.country,
      })
      .then(() => res.status(200).send(profile))
      .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  }
};