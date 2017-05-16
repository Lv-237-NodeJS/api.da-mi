'use strict';

const express = require('express'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  env = require('./server/config/env.js'),
  router = require('./server/router/index'),
  Sequelize = require('sequelize'),
  db = {};

const app = express();
const PORT = env.PORT;
 
const sequelize = new Sequelize(env.DATABASE_NAME, env.DATABASE_USERNAME, env.DATABASE_PASSWORD, {
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    dialect: env.DATABASE_DIALECT
  });

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./server/models/user.model.js')(sequelize, Sequelize);
db.profiles = require('./server/models/profile.model.js')(sequelize, Sequelize);

module.exports = db;
   
app.use(morgan('combined'));
app.use(bodyParser.json());

app.use((req, res, next) => {
   res.header('Content-Type', 'application/json');
   next();
  });

router(app, db);

db.sequelize.sync().then(() => {
   app.listen(PORT, () => {
     console.log('Express listening on port:', PORT);
   });

});
