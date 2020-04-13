const express = require('express');

const authRoutes = require('./auth');
const fooRoutes = require('./foo');
const usersRoutes = require('./users');

const router = express.Router();

router.use('/api', authRoutes);
router.use('/api', fooRoutes);
router.use('/api', usersRoutes);

module.exports = router;
