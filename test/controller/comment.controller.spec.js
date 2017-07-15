const server = require('../../server');
const frisby = require('frisby');
const baseUrl = 'http://localhost:8082';

describe('Login, create and delete comment', () => {
  it('returns status code 200, 201, 204', () => {
    frisby.create()
      .post(`${baseUrl}/api/auth/login`,
        { email: 'your@email.net', password: 'qQ22@@' },
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

        describe('Create comment', () => {
          it('returns status code 201 and text of created comment', () => {
            frisby.create()
              .post(`${baseUrl}/api/event/1/gift/1/comments`, {body: 'Hello'})
              .expectStatus(201)
              .expectHeader('Content-Type', 'application/json; charset=utf-8')
              .expectJSON({
                comment: {
                  body: 'Hello'
                }
              })
              .afterJSON(res => {

                describe('Delete comment', () => {
                  it('return status code 204', () => {
                    frisby.create()
                      .delete(`${baseUrl}/api/event/1/gift/1/comment/${res.comment.id}`)
                      .expectStatus(204)
                    .toss();
                  });
                });
              })
            .toss();
          });
        });
      })
    .toss();
  });
});

setTimeout(() => {
    server.close();
  }, 5000);
