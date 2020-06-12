const router = require('express').Router();
const { createOrder, getOrder } = require('../controllers/orders');
const { loginRequired } = require('../middleware/auth');
const { validateCreateOrder } = require('../validators/orders');
const { sanitizeReqBody } = require('../validators/sanitizers');
const { ensureCorrectOrderUser } = require('../middleware/orders');

router.post(
  '/',
  loginRequired,
  validateCreateOrder,
  sanitizeReqBody,
  createOrder,
);

router.route('/:oid').get(loginRequired, ensureCorrectOrderUser, getOrder);

module.exports = router;
