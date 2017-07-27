const frisby = require('frisby');
const { messages } = require('./../../server/helper');
const baseUrl = 'http://localhost:8082';

module.exports = {
  testResetPassword() {
    describe('Reset password', () => {
      it('returns status code 200 and message', () => {
        frisby.create()
          .post(`${baseUrl}/api/user/changepassword`,
            { oldPassword: 'P!assword!1', newPassword: 'P!assword!1' },
            { json: true },
            { headers: { 'Content-Type': 'application/json' }})
          .expectStatus(200)
          .expectJSON({
            message: messages.resetPassword,
            view: messages.success
          })
        .toss();
      });
    });

    describe('Not correct password', () => {
      it('returns status code 400 and message', () => {
        frisby.create()
          .post(`${baseUrl}/api/user/changepassword`)
          .expectStatus(400)
          .expectJSONTypes({
            message: messages.invalidUpdate,
            view: messages.danger
          })
        .toss();
      });
    });
  }
};
