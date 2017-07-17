const server = require('../../server');
const frisby = require('frisby');
const baseUrl = 'http://localhost:8082';

describe('Server require token', () => {
  describe('GET /', () => {
    it('returns status code 401', () => {
      frisby.create()
        .get(`${baseUrl}/api`)
        .expectStatus(401)
        .toss();
    });
  });
});

setTimeout(() => {
    server.close();
  }, 5000);
