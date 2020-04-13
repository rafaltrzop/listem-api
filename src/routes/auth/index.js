const express = require('express');

const authRoute = require('./auth.route');
const authTokenRoute = require('./auth-token.route');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/auth/token', authTokenRoute);

module.exports = router;
