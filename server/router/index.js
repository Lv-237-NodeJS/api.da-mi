'use strict';
const routes = [
  require('./controllers/users'),
  require('./controllers/profiles')
];
module.exports = function router(app, db) {
  return routes.forEach((route) => {
    route(app, db);
  });
};