'use strict';

const DB = require('./../../config/db');
const Gift = DB.Gift;
const Event = DB.Event;
const Guest = DB.Guest;
const { messages } = require('./../helper');

const isEventOwner = (eventId, userId, gift) => {
  return Event.findOne({
    where: {id: Number(eventId),
      $and: {owner: userId}
    }
  })
  .then(event => event && Number(event.dataValues.id) &&
    (!!gift && gift.dataValues.event_id === Number(eventId)))
  .catch(error => error);
};

const isEventGuest = (eventId, userId, gift, res) => {
  return Guest.findOne({
    where: {event_id: Number(eventId),
      $and: {user_id: userId}
    }
  })
  .then(guest => guest && Number(guest.dataValues.id) &&
    (!!gift && gift.dataValues.event_id === Number(eventId)) ||
    res.status(403).send(messages.giftNotFound))
  .catch(error => error);
};

const eventIsDraft = (eventId, res) => {
  return Event.findOne({
    where: {id: Number(eventId),
      $and: {status_event_id: 1}
    }
  })
  .then(result => result && Number(result.dataValues.id)) ||
    res.status(403).send(messages.accessDenied)
  .catch(error => error);
};

module.exports = {
  create(req, res) {
    let giftParams = Object.assign({}, req.body, {event_id: req.params.id});
    Gift.create(giftParams)
    .then(gift => isEventOwner(req.params.id, req.decoded.id, gift)
      .then(out => !!out && res.status(201).send(gift) ||
      res.status(403).send(messages.accessDenied))
    )
    .catch(error => res.status(400));
  },

  list(req, res) {
    Gift.findAll({where: {event_id: req.params.id}})
    .then(gifts => isEventOwner(req.params.id, req.decoded.id, gifts)
      .then(out => !!out && res.status(200).send(gifts) ||
        isEventGuest(req.params.id, req.decoded.id, gifts)
        .then(out => !!out && res.status(200).send(gifts)
        )
      )
    )
    .catch(error => res.status(400));
  },

  retrieve(req, res) {
    Gift.findById(req.params.gift_id)
    .then(gift => isEventOwner(req.params.id, req.decoded.id, gift)
      .then(out => !!out && res.status(200).send(gift) ||
        isEventGuest(req.params.id, req.decoded.id, gift, res)
          .then(out => !!out && res.status(200).send(gift))
      )
    )
    .catch(error => res.status(400));
  },

  update(req, res) {
    Gift.findById(req.params.gift_id)
    .then(gift => isEventOwner(req.params.id, req.decoded.id, gift)
      .then(out => !!out &&
          gift.updateAttributes(Object.assign({}, req.body))
          .then(gift => res.status(200).send(gift))
          .catch(error => res.status(400).send(error)) ||
          gift.updateAttributes({is_available: req.body.is_available})
          .then(gift => res.status(200).send(gift))
          .catch(error => res.status(400).send(error))
      )
    )
    .catch(error => res.status(400));
  },

  destroy(req, res) {
    Gift.findById(req.params.gift_id)
    .then(gift =>
      isEventOwner(req.params.id, req.decoded.id, gift)
        .then(out => !!out &&
          eventIsDraft(req.params.id, res).then(out => !!out &&
            gift
            .destroy()
            .then(gift => res.status(204).send(gift))
            .catch(error => res.status(400).send(error))
        ) || res.status(403).send(messages.accessDenied))
      )
    .catch(error => res.status(400));
  }
};
