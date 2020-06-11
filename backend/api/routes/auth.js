const express = require('express');
const router = express.Router();
const { login, facebookLogin } = require('../controllers/auth');
const { validateOAuth } = require('../validators/auth');

router.post('/login', login);
router.post('/oauth/token', validateOAuth, facebookLogin);

module.exports = router;
