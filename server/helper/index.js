const mailer = require('./mailer');
const message = require('./messages');

exports.mailer = mailer.send;
exports.message = message;
