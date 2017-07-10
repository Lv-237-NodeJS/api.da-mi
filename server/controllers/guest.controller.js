'use strict';

const { Guest, User, Event, Profile } = require('../../config/db');
const { mailer, templates, constants, messages } = require('./../helper');
const invitation = require('../../config/mailerOptions.json').invitation;

module.exports = {

  list(req, res) {
    Guest.findAll({
      where: {event_id: req.params.id},
      include: [{
        model: User,
        attributes: ['id', 'email']
      }]
    })
    .then(guests => res.status(200).send({guests}))
    .catch(error => res.status(404).send(error));
  },

  invite(req, res) {
    const eventId = req.params.id;
    const owner = req.body.owner || {
      firstName: 'Your',
      lastName: 'Friend',
    };

    Event.findById(eventId)
    .then(event => { event.owner === req.decoded.id &&
      Guest.findAll({
        where: {
          event_id: eventId
        },
        include: [{
          model: User,
          include: [Profile]
        }]
      })
      .then(guests => {
        guests.map(guest => {
          const {first_name: firstName, last_name: lastName} = guest.User.Profile || '';
          const route = guest.User.is_invited && '/signup' || '/';

          const data = Object.assign(invitation, {
            host: constants.URL,
            route,
            firstName,
            lastName,
            ownerFirstName: owner.firstName,
            ownerLastName: owner.lastName,
            email: guest.User.email,
            eventName: event.name,
            date: new Date(parseInt(event.date_event)),
            eventDescription: event.description
          });

          mailer(data, templates.invitation);
        });
      }) || res.status(403).json({'message': messages.accessDenied});
    })
    .then(() => res.status(200).json({'message': messages.invitationsSended}))
    .catch(error => res.status(400).send(error));
  }
};
