'use strict';

module.exports = (app, db) => {
  app.get('/profiles', (req, res) => {
    db.profiles.findAll()
      .then(profiles => {
        res.json(profiles);
      });
  });

  app.get('/profiles/:id', (req, res) => {
    const id = req.params.id;
    db.profiles.findById(id)
      .then(profile => {
        res.json(profile);
      });
  });
};
