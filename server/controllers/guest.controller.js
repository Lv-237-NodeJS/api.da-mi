'use strict';

const { Guest, User, Event, Profile } = require('../../config/db');
const { mailer, constants, messages } = require('./../helper');

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
    const template = 'invitation';
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
        }, Event]
      })
      .then(guests => {
        guests.map(guest => {
          const {first_name: firstName, last_name: lastName} = guest.User.Profile || '';
          const route = guest.User.is_invited && '/signup' || '/';

          mailer({
            host: constants.URL,
            route: route,
            subject: 'Invitation',
            firstname: firstName,
            lastname: lastName,
            ownerFirstName: owner.firstName,
            ownerLastName: owner.lastName,
            email: guest.User.email,
            eventName: guest.Event.name,
            date: new Date(parseInt(guest.Event.date_event)),
            eventDescription: guest.Event.description,
            img: 'party.jpg'
          }, template);
        });
      }) || res.status(403).send(messages.accessDenied);
    })
    .then(() => res.send(messages.invitationsSended))
    .catch(error => res.status(400).send(error));
  }
};
