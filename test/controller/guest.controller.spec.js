const frisby = require('frisby');
const { messages } = require('./../../server/helper');
const baseUrl = 'http://localhost:8082';

module.exports = {
  testGuest() {
    describe('List guests', () => {
      it('returns status code 200 and array of objects', () => {
        frisby.create()
          .get(`${baseUrl}/api/event/1/guests`)
          .expectStatus(200)
          .expectJSONTypes({
            guests: Array
          })
        .toss();
      });
    });

    describe('Invite guests', () => {
      it('returns status code 200 and message', () => {
        frisby.create()
          .post(`${baseUrl}/api/event/1/guest/invite`, {owner: 1})
          .expectStatus(200)
          .expectJSON({
            message: messages.invitationsSended
          })
        .toss();
      });
    });

    describe('Change guest status', () => {
      it('returns status code 200', () => {
        frisby.create()
          .put(`${baseUrl}/api/event/1/guest/status`, {status: 'undecided'})
          .expectStatus(200)
        .toss();
      });
    });
  }
};
