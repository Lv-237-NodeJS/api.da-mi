const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
const secret = require('./../config/jwt.secretkey.json');
const { messages } = require('./helper');

const token = req => req.headers['x-access-token'];
const tokenFreeURLs = ['/api/user/activation', '/api/users', '/api/support', '/api/auth/login'];
const checkURL = baseUrl => tokenFreeURLs.some(URL => baseUrl.match(URL));
const verifyToken = (token, res, req, next) => jwt.verify(token, secret.key, (err, decoded) =>
  err && res.status(401).json({'message': messages.failedToken}) ||
  (req.decoded = decoded) && next()
);

app.use(logger('dev'));
app.use(bodyParser.json({limit: '2mb'}));
app.use(bodyParser.urlencoded({limit: '2mb', extended: true}));
app.use(cors());

app.use('*', (req, res, next) => {
  !token(req) && !checkURL(req.baseUrl) && res.status(401).json({'message': messages.noToken}) ||
  token(req) && verifyToken(token(req), res, req, next) || checkURL(req.baseUrl) && next();
});

require('./routes')(app);

module.exports = app;
