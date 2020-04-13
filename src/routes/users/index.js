const express = require('express');

const usersRoute = require('./users.route');

const router = express.Router();

router.use('/users', usersRoute);

module.exports = router;
