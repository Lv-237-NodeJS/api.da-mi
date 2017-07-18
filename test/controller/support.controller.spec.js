const frisby = require('frisby');
const baseUrl = 'http://localhost:8082';

const randomInt = require('./../helper/test_helpers');
const testUserNumber = randomInt(10000, 99999).toString();
const testText = 'I have problem with test #' + testUserNumber;
const testEmail = 'work_' + testUserNumber + '@dami.com';

describe('Test Support Controller', () => {
  describe('Send Message To Support', () => {
    it('Expect status 200 and JSON', () => {
      frisby.create()
        .post(`${baseUrl}/api/support`, {
          'email': testEmail,
          'textarea': testText,
        },
        { json: true },
        { headers: { 'Content-Type': 'application/json' }}
        )
        .expectStatus(200)
        .expectHeader('Content-Type', 'application/json; charset=utf-8')
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
          message: 'Your message is sent'
        })
        .expectJSONTypes({
          message: String
        })
      .toss();
    });
  });
});
