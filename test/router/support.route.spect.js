const server = require('../../server');
const frisby = require('frisby');
const baseUrl = 'http://localhost:8082';

describe('Test support controller', () => {
  describe('POST /', () => {
    it('returns status code 200', () => {
      frisby.create('status code 200')
        .get(baseUrl + '/')
        .expectStatus(200)
        .expectJSON({
          message: 'Your message is sent'
        })
        .toss();
      done();
    });
  });
});

setTimeout(() => {
    server.close();
  }, 5000);
