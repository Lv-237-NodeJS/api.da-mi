'use strict';

const Gift = require('../../config/db').Gift;

module.exports = {
  create(req, res) {
    let assignGift = Object.assign({}, req.body, {event_id: req.event.id});

    Gift.create(assignGift)
    .then(gift => res.status(201).send(gift))
    .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    Gift.findAll({
      attributes: [
        'name', 'description', 'link', 'is_available'
      ],
      where: {event_id: req.event.id}
    })
    .then(gift => res.status(200).send(gift))
    .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    Gift.findById(
      req.params.id, {
        attributes: [
          'name', 'description', 'link', 'is_available', 'event_id'
        ]})
      .then(event => {
        if (gift.dataValues.event_id !== req.event.id || !gift)  {
          return res.status(400).send(messages.giftNotFound);
        } else {
          return res.status(200).send(gift);
        }
      })
      .catch(error => {
        return res.status(400).send(error);
      });
  },

  update(req, res) {
    Gift.findById(req.params.id).then(event => {
      if (gift.dataValues.event_id !== req.event.id || !gift) {
        return res.status(404).send(messages.giftNotFound);
      }
      let updatedGift = Object.assign({}, req.body);
      return gift.updateAttributes(updatedGift)
      .then(gift => res.status(200).send(gift))
      .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  },

  destroy(req, res) {
    Gift.findById(req.params.id).then(gift => {
      if (gift.dataValues.event_id !== req.event.id || !gift) {
        return res.status(404).send(messages.giftNotFound);
      }
      return gift
        .destroy()
        .then(gift => res.status(204).send(gift))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  }
};
