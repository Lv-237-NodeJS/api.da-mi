const frisby = require('frisby');
const baseUrl = 'http://localhost:8082';
const { testGuest } = require('./guest.controller.spec');
const { testComment } = require('./comment.controller.spec');

describe('Login user and run tests', () => {
  it('returns status code 200, 201', () => {
    frisby.create()
      .post(`${baseUrl}/api/auth/login`,
        { email: 'ivan.yarymovych@gmail.com', password: 'P!assword!1' },
        { json: true },
        { headers: { 'Content-Type': 'application/json' }})
      .expectStatus(200)
      .expectHeader('Content-Type', 'application/json; charset=utf-8')
      .expectJSONTypes({
        token: String
      })
      .afterJSON(res => {
        frisby.globalSetup({
          request: {
            headers: { 'x-access-token': res.token }
          }
        });
        testGuest();
        testComment();
      })
    .toss();
  });
});
