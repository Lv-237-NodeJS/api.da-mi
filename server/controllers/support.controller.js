const { mailer, templates, messages } = require('./../helper');
const support = require('../../config/mailerOptions.json').support;

module.exports = {
  support(req, res) {
    const assignSupport = Object.assign({}, req.body);

    let data = Object.assign(support, {
      firstName: req.body.name,
      lastName: req.body.surname,
      mailsForSupport: req.body.email,
      text: req.body.textarea
    });
    mailer(data, templates.support);
    res.status(200).json({'message': messages.sendMessage});
  }
};
