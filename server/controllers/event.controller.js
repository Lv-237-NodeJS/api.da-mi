'use strict';

const User = require('../../config/db').User;
const Event = require('../../config/db').Event;
const jwt = require('jsonwebtoken');
const secret = require('./../../config/jwt.secretkey.json');
const needEventProperties = {
  attributes: ['name', 'date_event', 'location_name', 'longitude', 'latitude', 'description']
};

module.exports = {
  create(req, res) {
    let token = req.headers['x-access-token'];
    let decoder;

    try {
      decoder = jwt.verify(token, secret.key);
    } catch (err) {
      return res.status(401).send({message: 'Error'});
    }
    let assignEvent = Object.assign({}, req.body, {owner: decoder.id});

    Event.create(assignEvent)
      .then(event => res.status(201).send(event))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    Event.findAll(needEventProperties)
    .then(event => res.status(200).send(event))
    .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    Event.findById(req.params.id, needEventProperties)
      .then(event => {
        if (!event) {
          return res.status(404).send({
            message: 'Event has not found!',
          });
        }
        return res.status(200).send(event);
      })
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    Event.findById(req.params.id)
    .then(event => {
      if (!event) {
        return res.status(404).send({
          message: 'Event has not found! Please try again!'
        });
      }
      let updatedEvent = Object.assign(event, req.body);
      return event.updateAttributes(updatedEvent.dataValues)
      .then(event => res.status(200).send(event))
      .catch(error => res.status(400).send(error));
    })
    .catch(error => {
        return res.status(500).send(error);
      });
  },

  destroy(req, res) {
    Event
      .findById(req.params.id)
      .then(event => {
        if (!event) {
          return res.status(404).send({
            message: 'Event has not found! Please try again!',
          });
        }
        return event
          .destroy()
          .then(event => res.status(204).send(event))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};
