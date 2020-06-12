const router = require('express').Router();
const { createOrder } = require('../controllers/orders');
const { loginRequired } = require('../middleware/auth');
const { validateCreateOrder } = require('../validators/orders');
const { sanitizeReqBody } = require('../validators/sanitizers');

router.post(
  '/',
  loginRequired,
  validateCreateOrder,
  sanitizeReqBody,
  createOrder,
);

module.exports = router;
