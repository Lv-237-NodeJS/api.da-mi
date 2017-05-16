'use strict';

const routes = [
  require('./routes/users'),
  require('./routes/profiles')
];

module.exports = function router(app, db) {
  return routes.forEach((route) => {
    route(app, db);
  });
};
