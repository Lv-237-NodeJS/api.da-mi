module.exports = {
  HOST: 'http://localhost:',
  PORT_BACK: '8082',
  PORT_FRONT: '8080',
  get BACKEND_URL() {
    return this.HOST + this.PORT_BACK;
  },
  get FRONTEND_URL() {
    return this.HOST + this.PORT_FRONT;
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
