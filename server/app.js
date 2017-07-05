const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const secret = require('./../config/jwt.secretkey.json');
const jwt = require('jsonwebtoken');
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json({limit: '2mb'}));
app.use(bodyParser.urlencoded({limit: '2mb', extended: true}));
app.use(cors());

app.use('/api/+(?!auth)/?*', function(req, res, next) {
  let token = req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, secret.key, function(err, decoded) {
      if (err) {
        return res.status(401).json({
          error: err,
          success: false,
          message: 'Failed to authenticate token.'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else if (req.baseUrl.includes('/api/user/activation') || req.baseUrl.includes('/api/users') ||
    req.baseUrl.includes('/api/support')) {
    next();
  } else {
    return res.status(401).send({
      success: false,
      message: 'No token provided.'
    });
  }
});

require('./routes')(app);

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the API Da-Mi.'
}));

module.exports = app;
