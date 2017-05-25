const profileController = require('../controllers').Profiles;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome.',
  }));

  app.get('/api/profiles/:id', profileController.retrieve);
  app.put('/api/profiles/:id', profileController.update);
};
