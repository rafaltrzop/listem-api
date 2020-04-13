const express = require('express');

const { validate } = require('../utils');
const controller = require('../../controllers/auth/auth.controller');

const router = express.Router();

router.route('/').post(validate(controller.loginRequest()), controller.login);

module.exports = router;
