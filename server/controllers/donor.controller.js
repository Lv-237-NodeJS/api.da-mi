'use strict';

const { Donor, Event, Gift, User, Profile } = require('../../config/db');
const { messages } = require('./../helper');

module.exports = {
  create(req, res) {
    let assignDonor = Object.assign({}, req.body, {gift_id: req.params.gift_id},
      {user_id: req.decoded.id});
    Gift.findOne({
      where: {
        id: req.params.gift_id,
        is_available: true
      }
    })
      .then(gift => {
          !gift && res.status(403).json({'message': messages.attempt}) ||
            Donor.findOne({
              where: {
                user_id: req.decoded.id,
                gift_id: req.params.gift_id
              }
            }).
              then(donor => {
                donor && res.status(403).json({'message': messages.booked}) ||
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
    let donorDescription = {
      donor: []
    };
    Gift.findOne({
      where: {
        id: req.params.gift_id,
        event_id: req.params.id
      },
      include: [Event]
    })
      .then(gift => {
        donorDescription.is_available = gift.dataValues.is_available;
        donorDescription.status = gift.dataValues.status;
        donorDescription.event = gift.Event.dataValues.name;
        donorDescription.date = `${new Date(Number(gift.Event.dataValues.date_event))}`;
      })
        .catch(error => res.status(400).send(error));
    Donor.findAll({
      include: [{
        model: User,
        include: [Profile],
      }],
      where: {
          gift_id: req.params.gift_id
        },
    })
      .then(donors => {
          donors.map(donor => {
            donorDescription.donor.push(`${donor.User.Profile.dataValues.first_name}
              ${donor.User.Profile.dataValues.last_name} ${donor.User.dataValues.email}`);
          });
          res.status(200).send(donorDescription);
        })
          .catch(error => res.status(400).send(error));
  },

  destroy(req, res) {
    Donor.findOne({
      where: {
        id: req.params.donor_id,
        gift_id: req.params.gift_id,
        user_id: req.decoded.id
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
