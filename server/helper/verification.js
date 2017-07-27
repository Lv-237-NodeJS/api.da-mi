'use strict';
/*
const { Event } = require('../../config/db');*/

module.exports = {
  eventIsDraft: eventId => {
  	console.log("TESTTTTTTTTTTTTTTTT");
    Event.findOne({where: {id: parseInt(eventId, 10), status_event: 'draft'}})
    .then(event => !!event);
 }
}
