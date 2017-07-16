'use strict';

const { Donor, Event, Gift, User, Profile } = require('../../config/db');
const { messages } = require('./../helper');

module.exports = {
  create(req, res) {
    let assignDonor = Object.assign({}, req.body, {gift_id: req.params.gift_id},
      {user_id: req.params.id});
    Gift.findOne({
      where: {
        id: req.params.gift_id,
        is_available: true
      }
    })
      .then(gift => {
          !gift && res.status(201).json({'message': messages.attempt}) ||
            Donor.findOne({
              where: {
                user_id: req.params.id,
                gift_id: req.params.gift_id
              }
            }).
              then(donor => {
                donor && res.status(201).json({'message': messages.booked}) ||
                  Donor.create(assignDonor).then(donor => {
                    Gift.update({
                      is_available: false
                    }, {
                      where: {
                        id: req.params.gift_id,
                        status: 'hasOneDonor',
                        is_available: true
                      }
                    });
                    res.status(200).send(donor);
                  })
                    .catch(error => res.status(400).send(error));
              })
                .catch(error => res.status(400).send(error));
        })
          .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    let result = {
      donor: []
    };
    let i = 0;
    Donor.findAll({
      where: {
        gift_id: req.params.gift_id
      }
    })
      .then(donor => {
          User.findAll().then(user => {
              Profile.findAll().then(profile => {
                  Gift.findOne({
                    where: {
                      id: req.params.gift_id
                    }
                  })
                    .then(gift => {
                      result.status = gift.dataValues.status;
                      result.is_available = gift.dataValues.is_available;
                      Event.findOne({
                        where: {
                          id: gift.dataValues.event_id
                        }
                      })
                        .then(event => {
                          result.event = event.dataValues.name;
                          result.data = `${new Date(Number(event.dataValues.date_event))}`;
                          donor.map(each => {
                            profile.forEach(every => {
                              user.forEach(some => {
                                each.dataValues.user_id == every.dataValues.id ==
                                  some.dataValues.id &&
                                    (result.donor[i++] = `${every.dataValues.first_name}` +
                                        ` ${every.dataValues.last_name}` +
                                         ` email: ${some.dataValues.email}`);
                              });
                            });
                          });
                          res.status(201).send(result);
                        });
                    });
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
          .catch(error => res.status(400).send(error));
      })
        .catch(error => res.status(400).send(error));
  }
};
