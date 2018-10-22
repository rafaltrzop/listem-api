const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();
const swaggerDocument = YAML.load('./swagger.yaml');

require('dotenv').config();
const routes = require('./routes');
require('./services/passport.service');

app.use(helmet());

// TODO: remove?
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public'))); // TODO: remove?

app.use(passport.initialize());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { customSiteTitle: 'Listem API' }));
app.use('/api', routes.publicRoutes);
app.use('/api', (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user, info) => {
    if (error) return next(error);

    if (!user) {
      return res.status(401).json({
        errors: [
          {
            title: 'Missing or wrong token', // TODO: change message
          },
        ],
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
  res.status(500).json({
    errors: [
      {
        title: err.message,
        detail: err.stack.split('\n'),
      },
    ],
  });
});

module.exports = app;
