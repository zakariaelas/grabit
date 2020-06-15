const validate = require('./validate');
const { body } = require('express-validator');
const ROLES = require('../../enums/roles');

const validateOAuth = validate([
  body('accessToken').exists().isString().withMessage('Invalid access token'),
  body('fbId').exists().isString().withMessage('Invalid fbId'),
  body('role')
    .optional()
    .isIn([ROLES.Customer, ROLES.Driver])
    .withMessage('Invalid role'),
]);

module.exports = {
  validateOAuth,
};
