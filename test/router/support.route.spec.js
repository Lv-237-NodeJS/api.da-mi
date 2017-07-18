const server = require('../../server');
const frisby = require('frisby');
const baseUrl = 'http://localhost:8082';

describe('Test Support Route', () => {
  describe('POST /', () => {
    it('returns status code 200', () => {
      frisby.create('status code 200')
        .post(`${baseUrl}/api/support`)
        .expectStatus(200)
        .expectJSON({
          message: 'Your message is sent'
        })
        .toss();
    });
  });
});

setTimeout(() => {
    server.close();
  }, 5000);
