'use strict';

const { Gift, Event, Guest } = require('./../../config/db');
const { messages } = require('./../helper');

const isEventOwner = (eventId, userId, gift) =>
  Event.findOne({where: {id: eventId, owner: userId}})
  .then(event => !!event && !!gift);

const isEventGuest = (eventId, userId, gift, res) =>
  Guest.findOne({where: {event_id: eventId, user_id: userId}})
  .then(guest => !!guest && !!gift || res.status(404).json({
    'message': messages.giftNotFound,
    'view': messages.danger
  }));

const eventIsDraft = eventId =>
  Event.findOne({where: {id: parseInt(eventId, 10), status_event: 'draft'}})
  .then(event => !!event);

const getGift = (giftId, eventId) =>
  Gift.findOne({where: {id: giftId, event_id: eventId}});

module.exports = {
  create(req, res) {
    let giftParams = Object.assign({}, req.body, {event_id: req.params.id});
    let gift = Gift.build(giftParams);
    isEventOwner(req.params.id, req.decoded.id, gift)
      .then(out => out && Gift.create(giftParams).then(gift => res.status(201).json({
        'gift': gift,
        'message': messages.createGift,
        'view': messages.success
      })) ||
        res.status(403).json({
          'message': messages.accessDenied,
          'view': messages.danger
        }))
    .catch(() => res.status(400).json({
      'message': messages.badRequest,
      'view': messages.danger
    }));
  },

  list(req, res) {
    Gift.findAll({where: {event_id: req.params.id}})
    .then(gifts => isEventOwner(req.params.id, req.decoded.id, gifts)
      .then(out => out &&
        res.status(200).send(gifts) ||
          isEventGuest(req.params.id, req.decoded.id, gifts, res)
          .then(out => out &&
          res.status(200).send(gifts))
      )
    )
    .catch(() => res.status(400).json({
      'message': messages.badRequest,
      'view': messages.danger
    }));
  },

  update(req, res) {
    getGift(req.params.gift_id, req.params.id)
    .then(gift => isEventOwner(req.params.id, req.decoded.id, gift)
      .then(out => out &&
        gift.updateAttributes(Object.assign({}, req.body))
        .then(gift => res.status(200).json({
                'gift': gift,
                'message': messages.updateGift,
                'view': messages.success
              })) ||
            isEventGuest(req.params.id, req.decoded.id, gift, res)
            .then(out => out &&
              gift.updateAttributes({is_available: req.body.is_available})
              .then(gift => res.status(200).json({
                'gift': gift,
                'message': messages.updateGift,
                'view': messages.success
              }))
            )
      )
    )
    .catch(() => res.status(400).json({
      'message': messages.badRequest,
      'view': messages.danger
    }));
  },

  destroy(req, res) {
    getGift(req.params.gift_id, req.params.id)
    .then(gift =>
      isEventOwner(req.params.id, req.decoded.id, gift)
        .then(out => out &&
          eventIsDraft(req.params.id).then(out => !!out &&
            gift.destroy()
            .then(() => res.status(200).json({
              'message': messages.deleteGift,
              'view': messages.success
            }))
            .catch(() => res.status(400).json({
              'message': messages.badRequest,
              'view': messages.danger
            }))
        ) || res.status(403).json({
          'message': messages.accessDenied,
          'view': messages.danger
        }))
      )
    .catch(() => res.status(400).json({
      'message': messages.badRequest,
      'view': messages.danger
    }));
  }
};
