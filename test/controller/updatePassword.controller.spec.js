const frisby = require('frisby');
const { messages } = require('./../../server/helper');
const baseUrl = 'http://localhost:8082';

describe('Test User controller create guest', () => {
    describe('Sign up guest', () => {
      it('Expect status 201 and JSON', () => {
        frisby.create()
          .post(`${baseUrl}/api/users`, {
            email: 'taras@gmail.com',
            password: '13DDss@3',
            user: {
              email: 'taras@gmail.com',
              is_activate: false,
              is_invited: true,
            }
          },
          { json: true },
          { headers: { 'Content-Type': 'application/json' }}
          )
          .expectStatus(201)
          .expectHeader('Content-Type', 'application/json; charset=utf-8')
          .expectHeaderContains('content-type', 'application/json')
          .expectJSON({
            user: {
              email: 'taras@gmail.com',
              profile_id: 3,
              is_activate: false,
              is_invited: true,
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
    describe('Guest is activated', () => {
      it('Expect status 422 and JSON', () => {
        frisby.create()
          .post(`${baseUrl}/api/users`, {
            email: 'pavlo@gmail.com',
            password: '13DDss@4',
            user: {
              email: 'pavlo@gmail.com',
              is_activate: true,
              is_invited: true,
            }
          },
          { json: true },
          { headers: { 'Content-Type': 'application/json' }}
          )
          .expectStatus(422)
          .expectJSON({
            message: messages.emailUsed,
            view: messages.danger
          })
          .toss();
      });
    });
  });
