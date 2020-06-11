const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/users');
const { validateCustomerSignUp } = require('../validators/users');

router.post('/', validateCustomerSignUp, createUser);

module.exports = router;
