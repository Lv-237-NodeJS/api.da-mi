'use strict';

const { User, Event, Guest } = require('../../config/db');
const { messages } = require('./../helper');

module.exports = {
  create(req, res) {
    const assignEvent = Object.assign({}, req.body, {owner: req.decoded.id});
    Event.create(assignEvent)
      .then(event => res.status(201).send(event))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    const userId = req.decoded.id;
    Guest.findAll({
      where: {
        user_id: userId
      },
      include: [Event]
    }).then(guestEvents => {
      Event.findAll({
        where: {
          owner: userId
        },
        order: [
          ['createdAt', 'DESC']
        ]
      })
      .then(events => res.status(200).send({myEvents: events, myInvitations: guestEvents}))
      .catch(error => res.status(400).send(error));
    });
  },

  retrieve(req, res) {
    const eventId = req.params.id;
    const userId = req.decoded.id;
    Event.findById(eventId)
    .then(event =>
      Guest.findOne({
        where: {
          event_id: eventId,
          user_id: userId
        }
      }).then(guest =>
        event && (guest || event.owner === userId) &&
        res.status(200).send(event) ||
        res.status(400).json({'message': messages.eventNotFound}))
    )
    .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    Event.findById(req.params.id).then(event => {
      if (event.dataValues.owner !== req.decoded.id || !event) {
        res.status(404).json({'message': messages.eventNotFound});
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
          res.status(404).json({'message': messages.eventNotFound});
        }
        return event
          .destroy()
          .then(() => res.status(200).json({'message': messages.eventDeleted}))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};
