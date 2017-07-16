const profileController = require('./profile.controller');
const userController = require('./user.controller');
const authController = require('./auth.controller');
const eventController = require('./event.controller');
const guestController = require('./guest.controller');
const giftController = require('./gift.controller');
const supportController = require('./support.controller');
const commentController = require('./comment.controller');
const uploadController = require('./upload.controller');
const donorController = require('./donor.controller');

module.exports = {
  profileController,
  userController,
  authController,
  eventController,
  guestController,
  giftController,
  supportController,
  commentController,
  uploadController,
  donorController
};
