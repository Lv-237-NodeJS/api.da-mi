'use strict';

const User = require('../../config/db').User;
const Profile = require('../../config/db').Profile;

module.exports = {
  create(req, res) {
    let assignUser = Object.assign({}, req.body);

    User.create(assignUser)
    .then(user => res.status(201).send(user))
    .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    User.findById(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(404).send({message: 'User Not Found'});
      }
      Profile.findById(user.profile_id).then(profile => {
        if (!profile) {
          return res.status(404).send({message: 'Profile Not Found'});
        }

        let data = {};
        data.email = user.email;
        data.firstName = profile.first_name;
        data.lastName = profile.last_name;
        data.avatar = profile.avatar;
        data.birthdate = profile.birth_date;
        data.address = profile.address;
        data.city = profile.city;
        data.country = profile.country;

        return res.status(200).send(data);
      })
      .catch(error => {
        return res.status(400).send(error);
      });
    })
    .catch(error => {
      return res.status(400).send(error);
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
