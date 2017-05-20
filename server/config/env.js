'use strict';
const env = {
  PORT: process.env.PORT || 8090,
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://localhost:5432/dami_database',
  DATABASE_NAME: process.env.DATABASE_NAME || 'dami_database',
  DATABASE_HOST: process.env.DATABASE_HOST || 'localhost',
  DATABASE_USERNAME: process.env.DATABASE_USERNAME || 'postgres',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || 'admin',
  DATABASE_PORT: process.env.DATABASE_PORT || 5432,
  DATABASE_DIALECT: process.env.DATABASE_DIALECT || 'postgres',
  NODE_ENV: process.env.NODE_ENV || 'development'
};
module.exports = env;