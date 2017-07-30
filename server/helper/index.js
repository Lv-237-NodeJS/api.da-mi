const mailer = require('./mailer');
const messages = require('./messages');
const constants = require('./constants');
const password = require('./passwordGenerator');
const templates = require('./templates');
const hooks = require('./hooks');

exports.mailer = mailer.send;
exports.messages = messages;
exports.constants = constants;
exports.password = password.passwordGenerate;
exports.templates = templates;
exports.hooks = hooks;
