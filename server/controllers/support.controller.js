const { mailer, messages } = require('./../helper');

module.exports = {
  support(req, res) {
    let assignSupport = Object.assign({}, req.body);
    let data = {
      subject: messages.problem,
      img: 'error.png',
      email: 'dami.suppor@gmail.com',
      firstname: req.body.name,
      lastname: req.body.surname,
      mailsForSupport: req.body.email,
      text: req.body.textarea
    };
    mailer(data, 'support');
    res.status(200).send();
  }
};
