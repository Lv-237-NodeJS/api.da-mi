'use strict';

const passwordHash = require('password-hash');

module.exports = {
  beforeCreate: model => {
    model.date_event && (model.date_event = Date.parse(model.date_event));
    model.password && (model.password = passwordHash.generate(model.password));
    model.createdAt = new Date().getTime();
    model.updatedAt = new Date().getTime();
  },
  beforeUpdate: model => {
  	model.password && (model.password = passwordHash.generate(model.password));
    model.updatedAt = new Date().getTime();
  }
};
