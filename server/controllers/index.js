const profiles = require('./profile.controller');
const users = require('./user.controller');
const autorization = require('./auth.controller');
const eventes = require('./event.controller');

module.exports = {
  profiles,
  users,
  autorization,
  eventes
};
