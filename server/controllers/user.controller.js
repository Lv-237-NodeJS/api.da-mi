'use strict';

const User = require('../../config/db').Users;
const Profile = require('../../config/db').Profiles;
const bcrypt = require('bcrypt');
const rounds = 8;

module.exports = {
  create(req, res) {
    let assignUser = Object.assign({}, req.body);
    let builtProfile = Profile.build();

    Profile.create(builtProfile).then(result => {
      let createdProfile = result;
      assignUser.profile_id = createdProfile.dataValues.id;

      User.create(assignUser)
        .then(user => res.status(201).send(user))
        .catch(error => res.status(400)).send(error);
    });

    User.hook('afterValidate', (user, options) => {
      user.password = bcrypt.hashSync(user.password, rounds);
    });
  }
};
