'use strict';

const twilioRespond = require('./twilioRespond');

const VERIFY = process.env.PASSWORD;

module.exports = function(req, res, next) {
  let textBody = req.query.Body;
  textBody = textBody.split(' ');
  if (textBody[0] !== 'Verification') {
    req.userRole = 'basic';
    return next();
  }
  const verificationToken = textBody[1];
  if (verificationToken !== VERIFY) {
    return twilioRespond('authorization failed', res);
  }
  req.userRole = 'admin';
  req.query.Body = textBody.slice(2).join(' ');
  next();
};
