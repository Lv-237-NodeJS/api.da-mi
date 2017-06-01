'use strict';

const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

const secret = require(path.resolve('./config', 'secretkey.json'));
let readHTMLTemplate = function(_name, callback) {
    fs.readFile(path.join('./server/templates/mailer/' + _name + '.html'), {
            encoding: 'utf-8'
        },
        function(err, html) {
            if (err) {
                throw err;
            }
            callback(null, html);
        }
    );
};

let transport = nodemailer.createTransport(smtpTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: secret.gmail.user,
        pass: secret.gmail.pass
    }
}));

module.exports = {
    _send(_data, _template) {
        readHTMLTemplate(_template, function(err, html) {
            let signupUrl = 'http://' + _data.host + _data.route + _data.token;
            let template = handlebars.compile(html);
            let replacements = {
                firstname: _data.firstname,
                lastname: _data.lastname,
                to: _data.email,
                signupUrl: signupUrl,
                eventName: _data.eventName,
                date: _data.date,
                eventDescription: _data.eventDescription
            };

            let htmlToSend = template(replacements);

            let mailOptions = {
                from: '"Da-Mi" <no-reply@da-mi.com>',
                to: _data.email,
                subject: _data.subject,
                html: htmlToSend,
                attachments: [{
                    filename: _data.img,
                    path: ('./server/templates/mailer/img/' + _data.img),
                    cid: 'bonsai@kreata.ee'
                }]
            };
            transport.sendMail(mailOptions, function(error, response) {
                if (error) {
                    callback(error);
                }
            });
        });
    }
}
