const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const secret = require('./../config/jwt.secretkey.json');
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/api/?!auth', function(req, res, next) {
  let token = req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, secret.key, function(err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: 'Failed to authenticate token.'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });

  } else {
    return res.status(401).send({
      success: false,
      message: 'No token provided.'
    });
  }
});

require('./routes')(app);

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the API Da-Mi.',
}));

module.exports = app;
