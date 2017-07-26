const frisby = require('frisby');
const baseUrl = 'http://localhost:8082';
const { messages } = require('./../../server/helper');

const randomInt = require('./../helper/test_helpers');
const testUserNumber = randomInt(10000, 99999).toString();
const testPass = 'Qq@1' + testUserNumber;
const testEmail = 'dami.tests+' + testUserNumber + '@gmail.com';

describe('Test User Controller', () => {
  describe('Sign Up User', () => {
    it('Expect status 201 and JSON', () => {
      frisby.create()
        .post(`${baseUrl}/api/users`, {
          'email': testEmail,
          'password': testPass
        },
        { json: true },
        { headers: { 'Content-Type': 'application/json' }}
        )
        .expectStatus(201)
        .expectHeader('Content-Type', 'application/json; charset=utf-8')
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
          user: {
            email: testEmail,
            profile_id: null,
            is_activate: false,
            is_invited: false,
          },
          message: messages.successSignup,
          view: messages.success
        })
        .expectJSONTypes({
          user: {
            password: String,
            email: String
          }
        })
      .toss();
    });
  });
});
