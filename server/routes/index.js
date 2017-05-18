const usersController = require('../controllers').users;

module.exports = (app) => {
  app.get('/dami', (req, res) => res.status(200).send({
    message: 'Welcome to the Da-Mi API!',
  }));

  app.post('/dami/users', usersController.create);
  app.get('/dami/users', usersController.list);
  app.get('/dami/users/:userId', usersController.retrieve);
  app.put('/dami/users/:userId', usersController.update);
  app.delete('dami/users/:userId', usersController.destroy);
  
};

