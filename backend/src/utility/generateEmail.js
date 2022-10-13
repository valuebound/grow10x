require("dotenv").config();
const { customLogger } = require("./logger");
const { env } = require('../config/environment');
const config = require(`../config/${env}.config`);
const sgMail = require('@sendgrid/mail');
const SENDGRID_API = config.SENDGRID_API;
sgMail.setApiKey(SENDGRID_API);

let successCount = 0, failureCount = 0;
const sendEmail = async (to, subject, message) => {
  const mailOptions = {
    from: config.email,
    to,
    subject,
    html: message,
  };
  sgMail.send(mailOptions, (error) => {
    if (error) {
      customLogger.log('warn', `${error}`)
      failureCount = failureCount + 1;
    } else {
      customLogger.log('info', `success from email sender`)
      successCount = successCount + 1;
    }
    customLogger.log('info', `Success Email Count: ${successCount}`);
    customLogger.log('info', `Failure Email Count: ${failureCount}`);
  });
};

module.exports = { sendEmail };
