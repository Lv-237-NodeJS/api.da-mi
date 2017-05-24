'use strict';

const Profile = require('../models/profile');

module.exports = {
  create(req, res) { // POST single profile
    return Profile
    .create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
    })
    .then(profile => res.status(201).send(profile))
    .catch(error => res.status(400).send(error));
  },
  
  list(req, res) { // Display list of all profiles
    return Profiles
    .all()
    .then(profile => res.status(201).send(profile))
    .catch(error => res.status(400).send(error));
  },
  
  retrieve(req, res) {  // GET one profile by id
    return Profile
    .findById(req.params.id, {
      include: [{
        model: Profile,
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
    return Profile
    .findById(req.params.id, {
      include: [{
        model: Profile,
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
      .then(() => res.status(200).send(profile)) // Send back the updated profile
      .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  },
  
  destroy(req, res){  // DELETE single profile
    return Profile
    .findById(req.params.id)
    .then(profile => {
      if (!profile) {
        return res.status(404).send({
          message: 'Profile Not Found',
        });
      }
      return profile
      .destroy()
      .then(() => res.status(204).send())
      .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  }
};
