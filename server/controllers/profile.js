const profile = require('../models').profile;

module.exports = {
  create(req, res) {
    return profile
      .create({
        content: req.body.content,
        userId: req.params.userId,
      })
      .then(profile => res.status(201).send(profile))
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
  return profile
    .find({
        where: {
          id: req.params.profileId,
          userId: req.params.userId,
        },
      })
    .then(profile => {
      if (!profile) {
        return res.status(404).send({
          message: 'Profile Not Found',
        });
      }

      return profile
        .update({
          content: req.body.content || profile.content,
          complete: req.body.complete || profile.complete,
        })
        .then(updatedprofile => res.status(200).send(updatedprofile))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
},

destroy(req, res) {
  return profile
    .find({
        where: {
          id: req.params.profileId,
          userId: req.params.userId,
        },
      })
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
},
};