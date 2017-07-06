const profileController = require('../controllers/profile.controller');
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
const eventController = require('../controllers/event.controller');
const guestController = require('../controllers/guest.controller');
const giftController = require('../controllers/gift.controller');
const supportController = require('../controllers/support.controller');

module.exports = app => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the DAMI API!',
  }));

  app.get('/api/profile/:id', profileController.retrieve);
  app.put('/api/profile/:id', profileController.update);

  app.post('/api/users', userController.create);
  app.get('/api/user/:id', userController.retrieve);
  app.delete('/api/user/:id', userController.destroy);

  app.post('/api/events', eventController.create);
  app.get('/api/events', eventController.list);
  app.get('/api/event/:id', eventController.retrieve);
  app.put('/api/event/:id', eventController.update);
  app.delete('/api/event/:id', eventController.destroy);

  app.post('/api/auth/login', authController.login);
  app.get('/api/user/activation/:token', authController.activation);

  app.post('/api/event/:id/guest/invite', guestController.invite);
  app.get('/api/event/:id/guests', guestController.list);
  app.post('/api/event/:id/guests', userController.create);
  app.delete('/api/event/:event_id/guest/:user_id', userController.destroy);

  app.post('/api/events/:id/gifts', giftController.create);
  app.get('/api/events/:id/gifts', giftController.list);
  app.get('/api/event/:id/gift/:gift_id', giftController.retrieve);
  app.put('/api/event/:id/gift/:gift_id', giftController.update);
  app.delete('/api/event/:id/gift/:gift_id', giftController.destroy);

  app.post('/api/support', supportController.support);
};
