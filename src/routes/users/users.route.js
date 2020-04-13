const express = require('express');
const passport = require('passport');

const { validate } = require('../utils');
const controller = require('../../controllers/users/users.controller');

const router = express.Router();

router
  .route('/')
  .post(
    validate(controller.createUserRequest()),
    passport.authenticate('signup', { session: false }),
    controller.createUser,
  );

module.exports = router;
