const mailer = require('./mailer');
const messages = require('./messages');
const constants = require('./constants');

exports.mailer = mailer.send;
exports.messages = messages;
exports.constants = constants;
