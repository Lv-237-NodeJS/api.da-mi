const User = require('../../config/db').User;
const jwt = require('jsonwebtoken');
const handlebars = require('handlebars');
const mailerHelper = require('./../helper/mailer.js').send;
const secret = require('./../../config/jwt.secretkey.json');
const activUser = require(`./../../config/config.json`).activUser;
const {message} = require('./../helper/index');

module.exports = {
  activation(req, res) {
    let token = req.params.token;
    let decoder;
    try {
      decoder = jwt.verify(token, secret.key);
    } catch (err) {
      res.status(401).send(message.linkNotValid);
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
          user.update({
            is_activate: true
          }, {
            where: {
              id: decoder.id
            }
          });
          activUser.email = decoder.email;
          mailerHelper(activUser, 'activated');
          res.status(200).send(message.congratulation);
        }
      }
    });
  }
};
