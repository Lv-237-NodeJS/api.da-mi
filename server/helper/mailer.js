'use strict';

const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const handlebars = require('handlebars');
const EmailTemplate = require('email-templates').EmailTemplate;
const path = require('path');
const secret = require(`${path.resolve('./config', 'mailerConfig.json')}`).sendGrid;

const transport = nodemailer.createTransport(smtpTransport({
  host: secret.host,
  port: secret.port,
  secure: false,
  auth: {
    user: secret.user,
    pass: secret.pass
  },
  logger: false,
  debug: false
}));
const templatesDir = ('./server/views/emails');

module.exports = {
  send(_data, _template) {
    const template = new EmailTemplate(path.join(templatesDir, _template));
    const url = `${_data.host}${_data.route}${_data.token || ''}`;
    const locals = {
        firstName: _data.firstName,
        lastName: _data.lastName,
        ownerFirstName: _data.ownerFirstName,
        ownerLastName: _data.ownerLastName,
        to: _data.email,
        url: url,
        eventName: _data.eventName,
        date: _data.date,
        eventDescription: _data.eventDescription,
        text: _data.text,
        mailsForSupport: _data.mailsForSupport,
        giftName: _data.giftName
      };

    template.render(locals, (error, sendMail) => {
      if (error) {
        return error;
      }
      const mailOptions = {
        from: `Da-Mi<${secret.email}>`,
        to: locals.to,
        subject: _data.subject,
        html: sendMail.html,
        text: sendMail.text,
        attachments: [{
          filename: _data.img,
          path: (`./server/views/emails/img/${_data.img}`),
          cid: secret.img
        }]
      };

      transport.sendMail(mailOptions, (error) => {
        if (error) {
          return error;
        }
      });
    });
  }
};
