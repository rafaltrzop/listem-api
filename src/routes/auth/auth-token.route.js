const express = require('express');

const { validate } = require('../utils');
const controller = require('../../controllers/auth/auth-token.controller');

const router = express.Router();

router
  .route('/')
  .post(
    validate(controller.refreshAccessTokenRequest()),
    controller.refreshAccessToken
  );

module.exports = router;
