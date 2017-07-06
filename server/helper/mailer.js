'use strict';

const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const handlebars = require('handlebars');
const EmailTemplate = require('email-templates').EmailTemplate;
const path = require('path');
const configDir = path.resolve('./config', 'mailerConfig.json');
const secret = require(`${configDir}`).sendGrid;

const transport = nodemailer.createTransport(smtpTransport({
  host: secret.host,
  port: secret.port,
  secure: false,
  auth: {
    user: secret.user,
    pass: secret.pass
  },
  logger: true,
  debug: false
}));

const templatesDir = ('./server/views/emails');

module.exports = {
  send(_data, _template) {
    const url = `http://${_data.host}${_data.route}${_data.token || ''}`;
    const template = new EmailTemplate(path.join(templatesDir, _template));
    const locals = {
        firstname: _data.firstname,
        lastname: _data.lastname,
        ownerFirstName: _data.ownerFirstName,
        ownerLastName: _data.ownerLastName,
        to: _data.email,
        url: url,
        eventName: _data.eventName,
        date: _data.date,
        eventDescription: _data.eventDescription,
        text: _data.text,
        mailsForSupport: _data.mailsForSupport
      };

    template.render(locals, (error, sendMail) => {

      if (error) {
        return error;
      }

      const mailOptions = {
        from: `"Da-Mi"<${secret.user}>`,
        to: _data.email,
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
