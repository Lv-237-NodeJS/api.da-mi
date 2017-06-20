'use strict';

const Guest = require('../../config/db').Guest;
const User = require('../../config/db').User;
const Event = require('../../config/db').Event;
const Profile = require('../../config/db').Profile;
const mailer = require('./../helper/mailer');
const URL = require('./../helper/constants');

module.exports = {

  list(req, res) {

    Guest.findAll({
      where: {event_id: req.params.id},
      include: [User]
    })
    .then(guests => {
      res.send({guests: guests});
    })
    .catch(error => res.status(404).send(error));
  },

  invite(req, res) {
    const template = 'invitation';
    const eventId = parseInt(req.params.id);
    const owner = req.body.owner || {
      firstname: 'Your',
      lastname: 'Friend',
    };

    Guest.findAll({
      where: {
        event_id: eventId
      },
      include: [{
        model: User,
        include: [Profile]
      }, {model: Event}]
    })
    .then(guests => {
      guests.map(guest => {
        const firstname = guest.User.Profile.first_name || '';
        const lastname = guest.User.Profile.last_name || '';
        const route = guest.User.is_invited ? '/signup' : `/event/${eventId}`;

        mailer.send({
          host: URL.HOST + URL.PORT,
          route: route,
          firstname: firstname,
          lastname: lastname,
          ownerFirstName: owner.firstname,
          ownerLastName: owner.lastname,
          email: guest.User.email,
          eventName: guest.Event.name,
          date: guest.Event.date_event,
          eventDescription: guest.Event.description,
          img: 'party.jpg'
        }, template);
      });
      return guests;
    })
    .then(guests => res.send({guests: guests}))
    .catch(err => res.status(400).send(error));
  }
};
