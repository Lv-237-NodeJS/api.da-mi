const server = require('../../server');
const frisby = require('frisby');
const baseUrl = 'http://localhost:8082';
const { messages } = require('./../../server/helper');

describe('Test Support Route', () => {
  describe('POST /', () => {
    it('returns status code 200', () => {
      frisby.create('status code 200')
        .post(`${baseUrl}/api/support`)
        .expectStatus(200)
        .expectJSON({
          message: messages.sendMessage,
          view: messages.success
        })
        .toss();
    });
  });
});

setTimeout(() => {
    server.close();
  }, 5000);
