const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const passport = require('passport');

const app = express();
require('dotenv').config();
const routes = require('./src/routes');
require('./src/services/passport.service');

app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());
app.use(routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    errors: [
      {
        title: err.message,
        detail: process.env.NODE_ENV === 'development' ? err.stack.split('\n') : undefined,
      },
    ],
  });
});

module.exports = app;
