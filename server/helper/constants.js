module.exports = {
  HOST: 'http://localhost:',
  PORT: '8080',
  get URL() {
    return this.HOST + this.PORT;
  },
  TIME: {
    ACTIVATION_TOKEN: '5d',
    LOGIN_TOKEN: '1d'
  },
  ROUTE: {
    ACTIVATION: '/api/user/activation/',
    SUPPORT: '/api/users/support'
  }
};
