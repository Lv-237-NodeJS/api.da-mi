const authController = require('../controllers/auth.controller');

module.exports = app => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Da - Mi project !!!'
  }));

  app.post('/api/auth/login', authController.login);
};
