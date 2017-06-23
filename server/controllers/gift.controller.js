'use strict';

const DB = require('./../../config/db');
const Gift = DB.Gift;
const Event = DB.Event;
const Guest = DB.Guest;
const { messages } = require('./../helper');

const validateGift = (entity, eventId) => {
  return entity && entity.dataValues.event_id === Number(eventId);
};

const isEventOwner = (eventId, userId, entity) => {
  return Event.findOne({
    where: {id: Number(eventId),
      $and: {owner: userId}
    }
  })
  .then(result => result && Number(result.dataValues.id) && validateGift(entity, eventId))
  .catch(error => error);
};

const isEventGuest = (eventId, userId, entity) => {
  return Guest.findOne({
    where: {event_id: Number(eventId),
      $and: {user_id: userId}
    }
  })
  .then(result => result && Number(result.dataValues.id) && validateGift(entity, eventId))
  .catch(error => error);
};

const eventIsDraft = eventId => {
  return Event.findOne({
    where: {id: Number(eventId),
      $and: {status_event_id: 1}
    }
  })
  .then(result => result && Number(result.dataValues.id))
  .catch(error => error);
};

module.exports = {
  create(req, res) {
    let giftParams = Object.assign({}, req.body, {event_id: req.params.id});
    Gift.create(giftParams)
    .then(gift => isEventOwner(req.params.id, req.decoded.id, gift)
      .then(out => !!out && res.status(201).send(gift) ||
        res.status(403).send(messages.accessDenied)
      )
    )
    .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    Gift.findAll({
      attributes: ['id', 'name', 'description', 'link', 'is_available', 'status'],
      where: {event_id: req.params.id}
    })
    .then(gifts => isEventOwner(req.params.id, req.decoded.id, gifts)
      .then(out => !!out && res.status(200).send(gifts) ||
        isEventGuest(req.params.id, req.decoded.id, gifts)
        .then(out => !!out &&
          res.status(200).send(gifts) ||
          res.status(403).send(messages.accessDenied)
        )
      )
    )
    .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    Gift.findById(
      req.params.gift_id, {
      attributes: ['name', 'description', 'link', 'is_available', 'event_id', 'status']
    })
    .then(gift => isEventOwner(req.params.id, req.decoded.id, gift)
      .then(out => !!out &&
        res.status(200).send(gift) ||
        (isEventGuest(req.params.id, req.decoded.id, gift).then(out => !!out &&
          res.status(200).send(gift) ||
          res.status(404).send(messages.giftNotFound))
        )
      )
    )
    .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    Gift.findById(req.params.gift_id)
    .then(gift => isEventOwner(req.params.id, req.decoded.id, gift)
      .then(out => !!out &&
          gift.updateAttributes(Object.assign({}, req.body))
          .then(gift => res.status(200).send(gift))
          .catch(error => res.status(400).send(error)) ||
        (isEventGuest(req.params.id, req.decoded.id, gift).then(out => !!out &&
            gift.updateAttributes({is_available: req.body.is_available})
            .then(gift => res.status(200).send(gift))
            .catch(error => res.status(400).send(error)) ||
          res.status(404).send(messages.giftNotFound))
        )
      )
    )
    .catch(error => res.status(400).send(error));
  },

  destroy(req, res) {
    Gift.findById(req.params.gift_id)
    .then(gift =>
      isEventOwner(req.params.id, req.decoded.id, gift)
        .then(out => !!out &&
          eventIsDraft(req.params.id).then(out => !!out &&
            gift
            .destroy()
            .then(gift => res.status(204).send(gift))
            .catch(error => res.status(400).send(error))
          ) || res.status(403).send(messages.accessDenied)
        )
      )
    .catch(error => res.status(400).send(error));
  }
};
