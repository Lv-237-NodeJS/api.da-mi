'use strict';

const { User, Event } = require('../../config/db');
const { messages } = require('./../helper');

module.exports = {
  create(req, res) {
    const assignEvent = Object.assign({}, req.body, {owner: req.decoded.id});
    Event.create(assignEvent)
      .then(event => res.status(201).send(event))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    Event.findAll({
      where: {owner: req.decoded.id},
      order: [
        ['createdAt', 'DESC']
      ]
    })
    .then(event => res.status(200).send(event))
    .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    Event.findById(req.params.id)
      .then(event => {
        if (event.dataValues.owner !== req.decoded.id || !event) {
          res.status(400).json(messages.eventNotFound);
        }
        res.status(200).send(event);
      })
      .catch(error => {
        res.status(400).send(error);
      });
  },

  update(req, res) {
    Event.findById(req.params.id).then(event => {
      if (event.dataValues.owner !== req.decoded.id || !event) {
        res.status(404).json(messages.eventNotFound);
      }
      const updatedEvent = Object.assign({}, req.body);
      event.updateAttributes(updatedEvent)
      .then(event => res.status(200).send(event))
      .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  },

  destroy(req, res) {
    Event.findById(req.params.id).then(event => {
        if (event.dataValues.owner !== req.decoded.id || !event) {
          res.status(404).json(messages.eventNotFound);
        }
        return event
          .destroy()
          .then(event => res.status(204).send(event))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};
