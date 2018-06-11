const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');

const app = express();
const routes = require('./routes');
require('./services/passport.service');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use('/api', routes.publicRoutes);
app.use('/api', (req, res, next) => {
  passport.authenticate('jwt', {session: false}, (error, user, info) => {
    if (error) return next(error);

    if (!user) {
      return res.status(401).json({
        errors: [
          {
            title: 'Missing or wrong token' // TODO: change message
          }
        ]
      });
    }

    next();
  })(req, res, next);
}, routes.privateRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  console.log('%%%%%%%%%%%%%%%%%%%', err); // TODO: remove later

  res.status(500).json({
    errors: [
      {
        title: err.message,
        detail: err.stack
      }
    ]
  });
});

module.exports = app;
