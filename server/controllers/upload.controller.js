'use strict';

const multer = require('multer');
const AWS = require('aws-sdk');
const uuid = require('node-uuid');

const s3 = new AWS.S3();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 52428800 },
});

module.exports = {
  uploadFile(req, res) {
    const params = {
      Bucket: 'da-mi-bucket',
      Key: 'img' + uuid.v4() + '.jpg',
      Body: req.file.buffer,
      ACL: 'public-read',
    };
    s3.putObject(params, (err) => {
          !!err && res.status(400).send(err);
          res.json({
            url: 'https://s3.eu-central-1.amazonaws.com/da-mi-bucket/' + params.Key
          });
        });
  }
};
