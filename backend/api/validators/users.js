const validate = require('./validate');
const { body, oneOf, validationResult } = require('express-validator');
const ROLES = require('../../enums/roles');
const { RequestValidationError } = require('../../errors/index');
const { capitalizeString } = require('./sanitizers');

const validateCustomerSignUpChain = [
  body('displayName')
    .exists()
    .isString()
    .trim()
    .customSanitizer(capitalizeString)
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
  body('role')
    .exists()
    .isString()
    .isIn([ROLES.Customer])
    .withMessage('Role is invalid'),
];

const validateDriverSignUpChain = [
  body('displayName')
    .exists()
    .isString()
    .trim()
    .customSanitizer(capitalizeString)
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
  body('phoneNumber')
    .exists()
    .isString()
    .matches(/^(\+?212|0)[67]\d{8}$/)
    .withMessage('Invalid phoneNumber'),
  body('role')
    .exists()
    .isString()
    .isIn([ROLES.Driver])
    .withMessage('Role is invalid'),
];

const validateSignUp = oneOf([
  validateDriverSignUpChain,
  validateCustomerSignUpChain,
]);

const validateEditProfile = validate([
  body('displayName')
    .exists()
    .isString()
    .trim()
    .customSanitizer(capitalizeString)
    .withMessage('Invalid full name'),
  body('email')
    .exists()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be a valid email')
    .trim(),
  body('phoneNumber')
    .exists()
    .isString()
    .matches(/^(\+?212|0)[67]\d{8}$/)
    .withMessage('Invalid phoneNumber'),
  body('imageUrl').exists().isString().withMessage('Invalid image url'),
]);

const validatePatchStatus = validate([
  body('active').exists().isBoolean().withMessage('Invalid status'),
]);

const errorFormatter = ({ msg }) => ({ message: msg });

const throwIfNotValid = (req, res, next) => {
  try {
    console.log(req.body);
    validationResult(req).throw();
    next();
  } catch (err) {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return next(new RequestValidationError(errors.array()));
    }
  }
};

module.exports = {
  validateSignUp,
  throwIfNotValid,
  validateEditProfile,
  validatePatchStatus,
};
