const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(session({
  secret: 'supersecret',
  resave: false,
  saveUninitialized: false
}));

app.use(function (req, res, next) {
  let token = req.session.token;
  next();
});

require('./routes')(app);

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the API Da-Mi.',
}));

module.exports = app;
