const devsController = require('../controllers').devs;
const devItemsController = require('../controllers').devItems;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the devs API!',
  }));

  app.post('/api/devs', devsController.create);
  app.get('/api/devs', devsController.list);

  app.put('/api/devs/:devId', devsController.update);
  app.delete('/api/devs/:devId', devsController.destroy);

  app.post('/api/devs/:devId/items', devItemsController.create);
  app.put('/api/devs/:devId/items/:devItemId', devItemsController.update);
  app.delete('/api/devs/:devId/items/:devItemId', devItemsController.destroy);

  
  app.all('/api/devs/:devId/items', (req, res) =>
    res.status(405).send({
      message: 'Method Not Allowed',
  }));
};