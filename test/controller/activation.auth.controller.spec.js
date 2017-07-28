const frisby = require('frisby');
const jwt = require('jsonwebtoken');
const { constants } = require('./../../server/helper');
const secret = require('./../../config/jwt.secretkey.json');

const baseUrl = 'http://localhost:8082';

const randomInt = require('./../helper/test_helpers');
const testUserNumber = randomInt(10000, 99999).toString();
const testPass = 'Qq@1' + testUserNumber;
const testEmail = 'dami.tests+' + testUserNumber + '@gmail.com';

describe('Activation user and run tests', () => {
  it('redirect to http://localhost:8080', () => {
    const signToken = (id, email) =>
      jwt.sign({id, email}, secret.key, {expiresIn: constants.ACTIVATION_TOKEN});
    frisby.create()
      .post(`${baseUrl}/api/users`, {
        email: testEmail,
        password: testPass
      },
      { json: true },
      { headers: { 'Content-Type': 'application/json' }}
      )
      .expectStatus(201)
      .expectHeader('Content-Type', 'application/json; charset=utf-8')
      .expectHeaderContains('content-type', 'application/json')
      .expectJSON({
        user: {},
        message: 'You have successfully signed up! For confirmation please visit your e-mail',
        view: 'success'
      })
      .afterJSON(user => {
        let token = signToken(user.user.id, user.user.email);
        frisby.create()
          .get(`${baseUrl}/api/user/activation/${token}`)
          .expectHeader('Content-Type', 'text/html; charset=utf-8')
          .expectBodyContains('DA-MI')
        .toss();
      })
    .toss();
  });
});
