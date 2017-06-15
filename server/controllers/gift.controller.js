'use strict';

const Gift = require('../../config/db').Gift;
const Event = require('../../config/db').Event;
const Guest = require('../../config/db').Guest;
const messages = require('../helper/messages');

const validate = (entity, paramsId, res) => {
  if (!entity || entity.dataValues.event_id !== Number(paramsId)) {
    return res.status(404).send(messages.giftNotFound);
  }
};

module.exports = {
  create(req, res) {
    let assignGift = Object.assign({}, req.body, {event_id: req.params.id});

    Gift.create(assignGift)
    .then(gift => res.status(201).send(gift))
    .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    Gift.findAll({
      attributes: ['name', 'description', 'link', 'is_available'],
      where: {event_id: req.params.id}
    })
    .then(gift => res.status(200).send(gift))
    .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    Gift.findById(
      req.params.gift_id, {
      attributes: ['name', 'description', 'link', 'is_available', 'event_id']
    })
    .then(gift => {
      if (!validate(gift, req.params.id, res)) {
        return res.status(200).send(gift);
      }
    })
    .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    Gift.findById(req.params.gift_id).then(gift => {
      if (!validate(gift, req.params.id, res)) {
        let updatedGift = Object.assign({}, req.body);
        return gift.updateAttributes(updatedGift)
          .then(gift => res.status(200).send(gift))
          .catch(error => res.status(400).send(error));
      }
    })
    .catch(error => res.status(400).send(error));
  },

  destroy(req, res) {
    Gift.findById(req.params.gift_id).then(gift => {
      if (!validate(gift, req.params.id, res)) {
        return gift
          .destroy()
          .then(gift => res.status(204).send(gift))
          .catch(error => res.status(400).send(error));
      }
    })
    .catch(error => res.status(400).send(error));
  }
};
