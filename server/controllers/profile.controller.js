'use strict';

module.exports = (app, db) => {

  // GET all profile
  app.get('/profile', (req, res) => {
    db.profile.findAll()
      .then ( profile => {
        res.json(profile);
      });
  });

  // GET one profile by id
  app.get('/profile/:id', (req, res) => {
    const id = req.params.id;
    db.profile.find({
      where: { id: id}
    })
      .then(profile => {
        res.json(profile);
      });
  });

  // POST single profile
  app.post('/profile', (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    db.profile.create({
      firstname: nafirstname,
      lastname: lastname
    })
      .then(newpPofile => {
        res.json(newProfile);
      })
  });

  // PATCH single profile
  app.patch('/profile/:id', (req, res) => {
    const id = req.params.id;
    const updates = req.body.updates;
    db.profile.find({
      where: { id: id }
    })
      .then(profile => {
        return profile.updateAttributes(updates)
      })
      .then(updatedProfile => {
        res.json(updatedpProfile);
      });
  });

  // DELETE single profile
  app.delete('/profile/:id', (req, res) => {
    const id = req.params.id;
    db.profile.destroy({
      where: { id: id }
    })
      .then(deletedProfile => {
        res.json(deletedProfile);
      });
  });
};
