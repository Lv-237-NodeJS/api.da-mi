const userController = require('../controllers/users');

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Da - Mi project !!!',
  }));

  app.post('/api/users', userController.create);
  app.get('/api/users', userController.list);
  app.get('/api/users/:id', userController.retrieve);
  app.put('/api/users/:id', userController.update);
  app.delete('/api/users/:id', userController.destroy);
};
