const profileController = require('../controllers/profile.controller');

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the DAMI API!',
  }));

  app.get('/api/profile/:id', profileController.retrieve);
  app.put('/api/profile/:id', profileController.update);
};
