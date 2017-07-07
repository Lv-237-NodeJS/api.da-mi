module.exports = {
  HOST: 'http://localhost:',
  PORT: '8080',
  get URL() {
    return this.HOST + this.PORT;
  },
  TIME: {
    TOKEN: '48h'
  },
  ROUTE: {
    ACTIVATION: '/api/user/activation/',
    SUPPORT: '/api/users/support'
  }
};
