const validate = require('./validate');
const { body } = require('express-validator');
const ORDER_STATUS = require('../../enums/orderStatus');

const validateCreateOrder = validate([
  body('from.address')
    .exists()
    .isString()
    .trim()
    .withMessage('Invalid pick up address'),
  body('destination.address')
    .exists()
    .isString()
    .trim()
    .withMessage('Invalid destination address'),
  body('from.place_id')
    .exists()
    .isString()
    .trim()
    .withMessage('Invalid pickup place id'),
  body('destination.place_id')
    .exists()
    .isString()
    .trim()
    .withMessage('Invalid destination place id'),
  body('description').optional().isString().withMessage('Invalid description'),
  body('date').exists().isString().withMessage('Invalid date'),
  body('minBudget')
    .optional()
    .isNumeric()
    .toInt()
    .isInt({ min: 0 })
    .withMessage('Invalid minimum budget'),
  body('maxBudget')
    .exists()
    .isNumeric()
    .toInt()
    .isInt({ min: 0 })
    .withMessage('Invalid maximum budget'),
  body('estimatedPrice')
    .exists()
    .isNumeric()
    .toFloat()
    .isFloat({ min: 0 })
    .withMessage('Invalid estimated price'),
  body('estimatedDistance')
    .exists()
    .isNumeric()
    .toFloat()
    .isFloat({ min: 0 })
    .withMessage('Invalid estimated distance'),
  body('estimatedDuration')
    .exists()
    .isNumeric()
    .toInt()
    .isInt({ min: 0 })
    .withMessage('Invalid estimated duration'),
  body('items').exists().isArray().withMessage('Invalid items'),
  body('items.*.text').exists().isString().withMessage('Invalid item text'),
  body('items.*').customSanitizer((value) => ({ text: value.text })),
]);

const validatePatchStatus = validate([
  body('status')
    .exists()
    .isString()
    .isIn([ORDER_STATUS.Picked, ORDER_STATUS.Delivered]),
]);

const validateGetOptimizedRoute = validate([
  body('position.lat').exists().isNumeric().withMessage('Invalid lat'),
  body('position.lng').exists().isNumeric().withMessage('Invalid lng'),
]);

module.exports = {
  validateCreateOrder,
  validatePatchStatus,
  validateGetOptimizedRoute,
};
