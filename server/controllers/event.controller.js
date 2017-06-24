'use strict';

const User = require('../../config/db').User;
const Event = require('../../config/db').Event;
const messages = require('../helper/messages');

module.exports = {
  create(req, res) {
    let assignEvent = Object.assign({}, req.body, {owner: req.decoded.id});

    Event.create(assignEvent)
      .then(event => res.status(201).send(event))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    Event.findAll({
      attributes: [
        'id', 'name', 'date_event', 'location_name', 'longitude', 'latitude', 'description'
      ],
      where: {owner: req.decoded.id},
      order: [
        ['createdAt', 'DESC']
      ]
    })
    .then(event => res.status(200).send(event))
    .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    Event.findById(
        req.params.id, {
        attributes: [
          'name', 'date_event', 'location_name', 'longitude', 'latitude', 'description', 'owner'
        ]})
      .then(event => {
        if (event.dataValues.owner !== req.decoded.id || !event)  {
          return res.status(400).send(messages.eventNotFound);
        } else {
          return res.status(200).send(event);
        }
      })
      .catch(error => {
        return res.status(400).send(error);
      });
  },

  update(req, res) {
    Event.findById(req.params.id).then(event => {
      if (event.dataValues.owner !== req.decoded.id || !event) {
        return res.status(404).send(messages.eventNotFound);
      }
      let updatedEvent = Object.assign({}, req.body);
      return event.updateAttributes(updatedEvent)
      .then(event => res.status(200).send(event))
      .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  },

  destroy(req, res) {
    Event.findById(req.params.id).then(event => {
        if (event.dataValues.owner !== req.decoded.id || !event) {
          return res.status(404).send(messages.eventNotFound);
        }
        return event
          .destroy()
          .then(event => res.status(204).send(event))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};
