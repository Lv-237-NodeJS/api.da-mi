'use strict';

const { Donor, Gift, User, Profile } = require('../../config/db');
const { messages } = require('./../helper');

module.exports = {
  create(req, res) {
    let assignDonor = Object.assign({}, req.body, {gift_id: req.params.gift_id},
      {user_id: req.params.id});
    Donor.findAll({
      attributes: ['gift_id', 'user_id']
    })
      .then(donor => {
        let isDonor = donor.filter((each) => {
          return each.dataValues.user_id ==
            req.params.id && each.dataValues.gift_id == req.params.gift_id;
        });
        !isDonor[0] &&
          Donor.create(assignDonor)
            .then(donor => res.status(201).send(donor))
            .catch(error => res.status(400).send(error)) ||
          res.status(400).json({'message': messages.badRequest});
      });
  },

  list(req, res) {
    let result = [];
    Donor.findAll({
      attributes: ['gift_id', 'user_id'],
      where: {
        gift_id: req.params.gift_id
      }
    })
      .then(donor => {
          User.findAll({
            attributes: ['id', 'email']
          })
          .then(user => {
            Profile.findAll({
                attributes: ['id', 'first_name', 'last_name']
              })
              .then(profile => {
              donor.map(each => {
                profile.forEach(every => {
                  user.forEach(some => {
                    each.dataValues.user_id == every.dataValues.id == some.dataValues.id &&
                      result.push(`${every.dataValues.first_name} ${every.dataValues.last_name}` +
                        ` email: ${some.dataValues.email}`);
                  });
                });
              });
              res.status(201).send(result);
            });
          });
        })
      .catch(error => res.status(400).send(error));
  },

  destroy(req, res) {
    Donor.findOne({
      where: {
        id: req.params.donor_id,
        gift_id: req.params.gift_id,
        user_id: req.params.id
      }
    })
      .then(donor => {
        donor.destroy()
          .then(donor => res.status(200).send(messages.deleted))
          .catch(error => res.status(400).json({'message': messages.badRequest}));
      })
        .catch(error => res.status(400).send(error));
  }
};
