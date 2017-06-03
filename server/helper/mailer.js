'use strict';

const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const handlebars = require('handlebars');
const EmailTemplate = require('email-templates').EmailTemplate;
const path = require('path');

const secret = require(path.resolve('./config', 'secretkey.json'));

let transport = nodemailer.createTransport(smtpTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: secret.gmail.user,
        pass: secret.gmail.pass
      }
  }));
let templatesDir = ('./server/views/emails');

module.exports = {
  _send(_data, _template) {
    let url = 'http://' + _data.host + _data.route + _data.token;
    let template = new EmailTemplate(path.join(templatesDir, _template));
    let locals = {
        firstname: _data.firstname,
        lastname: _data.lastname,
        to: _data.email,
        url: url,
        eventName: _data.eventName,
        date: _data.date,
        eventDescription: _data.eventDescription
      };

    template.render(locals, (err, sendMail) => {

      if (err) {
        return console.error(err);
      }

      let mailOptions = {
        from: '"Da-Mi" <no-reply@da-mi.com>',
        to: _data.email,
        subject: _data.subject,
        html: sendMail.html,
        text: sendMail.text,
        attachments: [{
          filename: _data.img,
          path: ('./server/views/emails/img/' + _data.img),
          cid: 'bonsai@kreata.ee'
        }]
      };

      transport.sendMail(mailOptions, (error, response) => {
        if (error) {
          callback(error);
        }
      });
    });
  }
};
