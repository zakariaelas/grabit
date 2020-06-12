const { matchedData } = require('express-validator');

const sanitizeReqBody = (req, res, next) => {
  req.body = matchedData(req, {
    locations: ['body'],
    includeOptionals: false,
  });
  next();
};

module.exports = {
  sanitizeReqBody,
};
