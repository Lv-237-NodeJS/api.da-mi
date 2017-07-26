const server = require('../../server');
const frisby = require('frisby');
const baseUrl = 'http://localhost:8082';
const { messages } = require('./../../server/helper');

describe('Test userCreate Route', () => {
  describe('POST /', () => {
    it('returns status code 201', () => {
      frisby.create('status code 201')
        .post(`${baseUrl}/api/users`, {
          email: 'taras@gmail.com',
          password: '13DDss@3'
        })
        .expectStatus(201)
        .expectJSON({
          message: messages.successSignup,
          view: messages.success
        })
        .toss();
    });
  }),
  describe('POST /', () => {
    it('returns status code 201', () => {
      frisby.create('status code 201')
        .post(`${baseUrl}/api/users`, {
          email: 'taras@gmail.com',
          password: '13DDss@3',
          user: {
            email: 'taras@gmail.com',
            is_activate: false,
            is_invited: true,
          }
        })
        .expectStatus(201)
        .expectJSON({
          message: messages.successSignup,
          view: messages.success
        })
        .toss();
    });
  });
});

setTimeout(() => {
    server.close();
  }, 5000);
