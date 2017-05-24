const profileController = require('../controllers').profiles;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome.',
  }));

  app.post('/api/profiles', profileController.create);
  app.get('/api/profiles', profileController.list);
  app.get('/api/profiles/:id', profileController.retrieve);
  app.put('/api/profiles/:id', profileController.update);
  app.delete('/api/profiles/:id', profileController.destroy);
};
