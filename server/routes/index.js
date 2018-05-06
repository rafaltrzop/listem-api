const express = require('express');
const app = express();

const usersRoute = require('./users.route');

app.use('/users', usersRoute);

module.exports = app;
