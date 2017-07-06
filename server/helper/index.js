const mailer = require('./mailer');
const messages = require('./messages');
const constants = require('./constants');
const password = require('./passwordGenerator');

exports.mailer = mailer.send;
exports.messages = messages;
exports.constants = constants;
exports.password = password.passwordGenerate;
