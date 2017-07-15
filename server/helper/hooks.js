'use strict';

const passwordHash = require('password-hash');

module.exports = {
  beforeCreate: model => {
    if (model.date_event) {
      model.date_event = Date.parse(model.date_event);
    }
    if (model.password) {
      model.password = passwordHash.generate(model.password);
    }
    model.createdAt = new Date().getTime();
    model.updatedAt = new Date().getTime();
  },
  beforeUpdate: model => {
    model.updatedAt = new Date().getTime();
  }
};
