const User = require('../../config/db').User;
const Profile = require('../../config/db').Profile;
const jwt = require('jsonwebtoken');
const {mailer, message} = require('./../helper');
const secret = require('./../../config/jwt.secretkey.json');

module.exports = {
  activation(req, res) {
    let token = req.params.token;
    let decoder;
    try {
      decoder = jwt.verify(token, secret.key);
    } catch (err) {
      res.status(498).send(message.linkNotValid);
    }
    User.findOne({
      where: {
        id: decoder.id
      }
    })
    .then(user => {
      if (!user) {
        res.status(404).send(message.userNotValid);
      } else {
        if (user.is_activate) {
          res.status(200).send(message.linkAlreadyActivated);
        } else {
          let assignProfile = Object.assign({}, {
            first_name: decoder.first_name,
            last_name: decoder.last_name
          });
          Profile.create(assignProfile)
          .then(result => {
            User.findById(decoder.id)
            .then(user => {
              user.update({
                profile_id: result.dataValues.id,
                is_activate: true
              });
              activUser.email = decoder.email;
              mailer(activUser, 'activated');
              res.status(200).send(message.congratulation);
            });
          })
          .catch(error => res.status(400).send(error));
        }
      }
    });
  }
};