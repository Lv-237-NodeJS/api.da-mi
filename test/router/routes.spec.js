const server = require('../../server');
const frisby = require('frisby');
const baseUrl = 'http://localhost:8082';

describe('Hello DAMI API Server', () => {
  describe('GET /', () => {
    it('returns status code 200', () => {
      frisby.create('status code 200')
        .get(baseUrl + '/')
        .expectStatus(200)
        .toss();
    });
    it('should respond with Welcome to the API Da-Mi.', done => {
      frisby.create('status code 200')
        .get(baseUrl + '/')
        .expectJSON({
          message: 'Welcome to the API Da-Mi.'
        })
      .toss();
      done();
    });
  });

  describe('GET /api', () => {
    it('returns status code 200', () => {
      frisby.create('status code 200')
        .get(baseUrl + '/api')
        .expectStatus(200)
        .toss();
    });
    it('should respond with Welcome to the DAMI API!', done => {
      frisby.create('status code 200')
        .get(baseUrl + '/api')
        .expectJSON({
          message: 'Welcome to the DAMI API!'
        })
      .toss();
      done();
    });
  });
});

setTimeout(() => {
    server.close();
  }, 5000);
