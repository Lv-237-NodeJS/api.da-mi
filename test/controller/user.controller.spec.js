
const frisby = require('frisby');
const baseUrl = 'http://localhost:8082';

const randomInt = require('./../helper/test_helpers');
const testUserNumber = randomInt(10000, 99999).toString();
const testPass = 'Qq@@11' + testUserNumber;
const testEmail = 'test_' + testUserNumber + '@dami.com';

describe('Test User Controller', () => {
  describe('Sign Up User', () => {
    it('Expect status 201 and JSON', () => {
      frisby.create()
        .post(baseUrl + '/api/users', {
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
          email: testEmail,
          is_activate: false,
          is_invited: false,
        })
        .expectJSONTypes({
          password: String,
          email: String
        })
      .toss();
    });
  });
});
