'use strict';

module.exports = (app, db) => {
  app.get('/users', (req, res) => {
    db.users.findAll()
      .then(users => {
        res.json(users);
      });
  });

  app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    db.users.findById(id)
      .then(user => {
        res.json(user);
      });
  });
};
