const user = require('../models').user;
const profile = require('../models').profile;

module.exports = {
  create(req, res) {
    return user
      .create({
        title: req.body.title,
      })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
  return user
    .findAll({
      include: [{
        model: profile,
        as: 'profiles',
      }],
    })
    .then(users => res.status(200).send(users))
    .catch(error => res.status(400).send(error));
},
update(req, res) {
  return user
    .findById(req.params.userId, {
      include: [{
        model: profile,
        as: 'profiles',
      }],
    })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: 'User Not Found',
        });
      }
      return user
        .update({
          title: req.body.title || user.title,
        })
        .then(() => res.status(200).send(user))  
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
},
destroy(req, res) {
  return user
    .findById(req.params.userId)
    .then(user => {
      if (!user) {
        return res.status(400).send({
          message: 'User Not Found',
        });
      }
      return user
        .destroy()
        .then(() => res.status(204).send({ message: 'User deleted successfully.' }))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
},
};
