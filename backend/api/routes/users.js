const express = require('express');
const router = express.Router();
const {
  createUser,
  getUserOrders,
  editProfile,
  patchDriverStatus,
} = require('../controllers/users');
const {
  validateEditProfile,
  validateSignUp,
  validatePatchStatus,
  throwIfNotValid,
} = require('../validators/users');
const { sanitizeReqBody } = require('../validators/sanitizers');
const {
  loginRequired,
  ensureCorrectUser,
  ensureDriver,
} = require('../middleware/auth');

router
  .route('/')
  .post(validateSignUp, sanitizeReqBody, throwIfNotValid, createUser);

router
  .route('/:uid')
  .put(
    loginRequired,
    ensureCorrectUser,
    validateEditProfile,
    sanitizeReqBody,
    editProfile,
  );

router.patch(
  '/:uid/active',
  loginRequired,
  ensureCorrectUser,
  ensureDriver,
  validatePatchStatus,
  sanitizeReqBody,
  patchDriverStatus,
);

router.route('/orders').get(loginRequired, getUserOrders);

module.exports = router;
