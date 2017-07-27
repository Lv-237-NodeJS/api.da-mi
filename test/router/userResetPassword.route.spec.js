const server = require('../../server');
const frisby = require('frisby');
const baseUrl = 'http://localhost:8082';
const { messages } = require('./../../server/helper');

module.exports = {
  testResetPasswordRoute() {
    describe('Test User Reset Password Route', () => {
      describe('POST /', () => {
        it('returns status code 200', () => {
          frisby.create('status code 200')
            .post(`${baseUrl}/api/user/changepassword`, {
              oldPassword: 'P!assword!1',
              newPassword: 'P!assword!1'
            })
            .expectStatus(200)
            .expectJSON({
              message: messages.resetPassword,
              view: messages.success
            })
            .toss();
        });
      });
    });
  }
};

setTimeout(() => {
    server.close();
  }, 5000);
