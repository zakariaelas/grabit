const express = require('express');
const router = express.Router();
const { login, facebookLogin } = require('../controllers/auth');

router.post('/login', login);
router.post('/oauth/token', facebookLogin);

module.exports = router;
