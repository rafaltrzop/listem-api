const express = require('express');

const { authenticate } = require('../utils');
const controller = require('../../controllers/foo/bar.controller');

const router = express.Router();

router.route('/').get(authenticate, controller.index);

module.exports = router;
