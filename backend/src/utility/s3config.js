const AWS = require("aws-sdk");
const { env } = require('../config/environment');
const config = require(`../config/${env}.config`);

AWS.config.update({
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  region: config.AWS_DEFAULT_REGION,
});
const s3Config = {
  apiVersion: config.AWS_API_VERSION,
};
const s3 = new AWS.S3(s3Config);
module.exports = s3;