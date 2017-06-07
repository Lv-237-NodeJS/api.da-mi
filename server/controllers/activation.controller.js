const User = require('../../config/db').User;
const jwt = require('jsonwebtoken');
const handlebars = require('handlebars');
const mailerHelper = require('./../helper/mailer.js').send;
const secret = require('./../../config/jwt.secretkey.json');

module.exports = {
  activation(req, res) {
    let token = req.headers['x-access-token'];
    let activUser = {
          email: 'levanwork@ukr.net',
          firstname: 'Maria',
          lastname: 'Voitovych',
          url: '/api'
        };
    let decoder;
    try {
      decoder = jwt.verify(token, secret.key);
    } catch (err) {
      activUser.subject = '~*~🎁~* Link are not valid or time expired! *~🎁~*~';
      activUser.img = 'notvalid.jpg';
      mailerHelper(activUser, 'notvalid');
    }
    User.findOne({
      where: {
        id: decoder.id
      }
    })
    .then(user => {
      if (!user) {
        activUser.subject = '~*~🎁~* This user is not create yet! *~🎁~*~';
        activUser.img = 'notcreate.jpg';
        mailerHelper(activUser, 'notcreate');
      } else {
        if (user.is_activate) {
          activUser.subject = '~*~🎁~* link has already actived! *~🎁~*~';
          activUser.img = 'repeatactiv.jpg';
          mailerHelper(activUser, 'repeatactiv');
        } else {
          User.update({
            is_activate: true
          }, {
            where: {
              id: decoder.id
            }
          });
          activUser.subject = '~*~🎁~* Congratulation! *~🎁~*~';
          activUser.img = 'keys.jpg';
          mailerHelper(activUser, 'activated');
          }
        }
    });
  }
};
