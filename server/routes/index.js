const { profileController, userController, authController,
  eventController, guestController, giftController,
  supportController, commentController, uploadController } = require('../controllers');
const multer = require('multer');

module.exports = app => {
  app.get('/api/profile/:id', profileController.retrieve);
  app.put('/api/profile/:id', profileController.update);

  app.post('/api/users', userController.create);
  app.get('/api/user/:user_id', userController.retrieve);
  app.delete('/api/user/:user_id', userController.destroy);

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
  app.put('/api/event/:id/gift/:gift_id', giftController.update);
  app.delete('/api/event/:id/gift/:gift_id', giftController.destroy);

  app.post('/api/support', supportController.support);

  app.post('/api/event/:id/gift/:gift_id/comments', commentController.create);
  app.get('/api/event/:id/gift/:gift_id/comments', commentController.list);
  app.put('/api/event/:id/gift/:gift_id/comment/:comment_id', commentController.update);
  app.delete('/api/event/:id/gift/:gift_id/comment/:comment_id', commentController.destroy);

  const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 52428800 }
  });
  app.post('/api/upload', upload.single('fileToUpload'), uploadController.uploadFile);

  app.post('/api/user/:id/gift/:gift_id/donor', donorController.create);
  app.get('/api/user/:id/gift/:gift_id/donor', donorController.list);
  app.delete('/api/user/:id/gift/:gift_id/donor/:donor_id', donorController.destroy);
};
