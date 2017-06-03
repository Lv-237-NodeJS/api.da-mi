const profileController = require('../controllers/profile.controller');
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
const eventController = require('../controllers/event.controller');

module.exports = app => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the DAMI API!',
  }));

  app.get('/api/profile/:id', profileController.retrieve);
  app.put('/api/profile/:id', profileController.update);

  app.post('/api/users', userController.create);
  app.get('/api/user/:id', userController.retrieve);
  app.delete('/api/user/:id', userController.destroy);
  app.get('/api/user/:id/activation', userController.activation);

  app.post('/api/auth/login', authController.login);

  app.post('/api/events', eventController.create);
  app.get('/api/events', eventController.list);
  app.get('/api/event/:id', eventController.retrieve);
  app.put('/api/event/:id', eventController.update);
  app.delete('/api/event/:id', eventController.destroy);

};
