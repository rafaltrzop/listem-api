const express = require('express');

const barRoute = require('./bar.route');

const router = express.Router();

router.use('/foo/bar', barRoute);

module.exports = router;
