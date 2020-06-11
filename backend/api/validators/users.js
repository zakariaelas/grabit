const validate = require('./validate');
const { body } = require('express-validator');

const validateCustomerSignUp = validate([
  body('displayName')
    .exists()
    .isString()
    .trim()
    .withMessage('Invalid full name'),
  body('email')
    .exists()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be a valid email')
    .trim(),
  body('password')
    .exists()
    .isString()
    .isLength({ min: 8, max: 20 })
    .withMessage('Password must contain at least 8 characters'),
]);

module.exports = {
  validateCustomerSignUp,
};
