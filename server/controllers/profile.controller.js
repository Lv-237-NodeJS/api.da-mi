'use strict';

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
        return res.status(404).send({message: 'Profile Not Found',
        });
      }
      let updateProfile = Object.assign({}, req.body);
      return profile.updateAttributes(updateProfile || profile)
      .then(() => res.status(200).send(profile))
      .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(555).send(error));
  }
};
