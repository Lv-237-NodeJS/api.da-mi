'use strict';

const User = require('../../config/db').User;
const Profile = require('../../config/db').Profile;
const Guest = require('../../config/db').Guest;
const password = require('./../helper/passwordGenerator');

module.exports = {
  create(req, res) {
    let assignUser = Object.assign({}, req.body);
    const id = req.body.eventId;
    id ?
      req.body.emails.map(email => {
        User.findOne({
          where: {
            email: email
          }
        })
        .then(user => user ?
          Guest.create({
            event_id: id,
            user_id: user.id
          }) :
          User.create({
            email: email,
            password: password.passwordGenerate(),
            is_invited: true
          })
          .then(user => {
            Guest.create({
              event_id: id,
              user_id: user.id
            });
          })
        )
        .then(user => {
          res.send({user: user});
        })
        .catch(error => res.status(400).send(error));
      }) :
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

        const data = Object.assign({}, {email: user.email,
          firstName: profile.first_name,
          lastName: profile.last_name,
          avatar: profile.avatar,
          birthdate: profile.birth_date,
          address: profile.address,
          city: profile.city,
          country: profile.city
        });
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
