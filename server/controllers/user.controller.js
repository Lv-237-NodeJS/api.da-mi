'use strict';

const User = require('../../config/db').User;
const Profile = require('../../config/db').Profile;
const Guest = require('../../config/db').Guest;
const password = require('./../helper/passwordGenerator');

module.exports = {
  create(req, res) {
    let assignUser = Object.assign({}, req.body);
<<<<<<< 479d2539cbdff1cb575f5d8dea951a1521f05a63
<<<<<<< 241947aad6c7123379d9ec72846b99627c1e36c4
    const eventId = req.body.eventId;
    eventId ?
      req.body.emails.map(email => {
        User.findOrCreate({
          where: {
            email: email
          },
          defaults: {
            email: email,
            password: password.passwordGenerate(),
            is_invited: true
          }
        })
        .spread((user, created) => {
          Guest.findOne({
            where: {
              user_id: user.id
            }
          })
          .then(guest => {!guest &&
            Guest.create({
              event_id: eventId,
              user_id: user.id
            });
          });
        });
      }) :
=======

    User.create(assignUser)
    .then(user => res.status(201).send(user))
    .catch(error => res.status(400).send(error));
  },

  signup(req, res) {
>>>>>>> erase white space
    User.findOne({
      where: {
        email: req.body.email
      }
    })
    .then(user => {
      let assignUser = Object.assign({}, req.body);
      let dataActivation = user => {
        let token = jwt.sign({
          id: user.id,
          email: user.email
        }, secret.key, {expiresIn: constant.TIME.TOKEN});
        let data = {
          subject: message.activation,
          img: 'activ.jpg',
          host: req.headers.host,
          route: constant.ROUTE.ACTIVATION,
          email: req.body.email,
          token: token
        };
        mailer(data, 'activation');
        res.status(201).send();
      };
      if (user) {
<<<<<<< 479d2539cbdff1cb575f5d8dea951a1521f05a63
        if (!user.is_invated) {
          res.status(422).send(message.emailUsed);
        } else {
          User.updateAttributes(assignUser)
          .then(dataActivation)
          .catch(error => res.status(400).send(error));
        }
      } else {
=======
        res.status(422).send(error);
      } else {
        let assignUser = Object.assign({}, req.body);

>>>>>>> erase white space
        User.create(assignUser)
        .then(dataActivation)
        .catch(error => res.status(400).send(error));
      };
    });
  },
  retrieve(req, res) {
    User.findById(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(404).send(message.userError);
      }
      Profile.findById(user.profile_id).then(profile => {
        if (!profile) {
          return res.status(404).send(message.profileError);
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
        return res.status(404).send(message.userNotFound);
      }
      return user
      .destroy()
      .then(user => res.status(204).send(user))
      .catch(error => res.status(404).send(error));
    })
    .catch(error => res.status(404).send(error));
  }
};
