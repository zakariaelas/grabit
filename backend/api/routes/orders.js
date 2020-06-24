const router = require('express').Router();
const {
  createOrder,
  getOrder,
  patchOrderStatus,
  getOptimizedRoute,
} = require('../controllers/orders');
const { loginRequired, ensureDriver } = require('../middleware/auth');
const {
  validateCreateOrder,
  validatePatchStatus,
  validateGetOptimizedRoute,
} = require('../validators/orders');
const { sanitizeReqBody } = require('../validators/sanitizers');
const {
  ensureCorrectOrderUser,
  ensureCorrectOrderDriver,
} = require('../middleware/orders');

router.post(
  '/',
  loginRequired,
  validateCreateOrder,
  sanitizeReqBody,
  createOrder,
);

router.get('/route', loginRequired, ensureDriver, getOptimizedRoute);

router.route('/:oid').get(loginRequired, ensureCorrectOrderUser, getOrder);

router
  .route('/:oid/status')
  .patch(
    loginRequired,
    ensureDriver,
    ensureCorrectOrderDriver,
    validatePatchStatus,
    sanitizeReqBody,
    patchOrderStatus,
  );

module.exports = router;
