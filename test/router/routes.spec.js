const server = require('../../server');
const PORT = parseInt(process.env.PORT, 10) || 8082;
const baseUrl = 'http://localhost:' + PORT;
const request = require('request');

describe('Hello DAMI API Server', () => {
  describe('GET /', () => {
    it('returns status code 200', () => {
      request.get(baseUrl + '/', (error, response, body) => {
        expect(response.statusCode).toBe(200);
      });
    });
    it('should respond with Welcome to the DAMI API!', done => {
      request(baseUrl + '/', (error, response, body) => {
        expect(body).toEqual('{"message":"Welcome to the API Da-Mi."}');
        done();
      });
    });
  });
  describe('GET /api', () => {
    it('returns status code 200', () => {
      request.get(baseUrl, (error, response, body) => {
        expect(response.statusCode).toBe(200);
      });
    });
    it('should respond with Welcome to the DAMI API!', done => {
      request(baseUrl + '/api', (error, response, body) => {
        expect(body).toEqual('{"message":"Welcome to the DAMI API!"}');
        done();
      });
    });
  });
});
