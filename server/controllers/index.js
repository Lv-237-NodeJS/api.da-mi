const profiles = require('./profile.controller');
const users = require('./user.controller');
const autorization = require('./auth.controller');
const events = require('./event.controller');
const guests = require('./guest.controller');
const gifts = require('./gift.controller');

module.exports = {
  profiles,
  users,
  autorization,
  events,
  guests,
  gifts
};
