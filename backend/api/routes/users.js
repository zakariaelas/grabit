const express = require('express');
const router = express.Router();
const { createUser, getUserOrders } = require('../controllers/users');
const { validateCustomerSignUp } = require('../validators/users');
const { sanitizeReqBody } = require('../validators/sanitizers');
const { loginRequired } = require('../middleware/auth');

router.post('/', validateCustomerSignUp, sanitizeReqBody, createUser);
router.route('/orders').get(loginRequired, getUserOrders);

module.exports = router;
