const validate = require('./validate');
const { body } = require('express-validator');

const validateCreateOrder = validate([
  body('from').exists().isString().withMessage('Invalid pick up address'),
  body('destination')
    .exists()
    .isString()
    .withMessage('Invalid destination address')
    .trim(),
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

module.exports = {
  validateCreateOrder,
};
