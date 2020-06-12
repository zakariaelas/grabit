const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/users');
const { validateCustomerSignUp } = require('../validators/users');
const { sanitizeReqBody } = require('../validators/sanitizers');

router.post('/', validateCustomerSignUp, sanitizeReqBody, createUser);

module.exports = router;
