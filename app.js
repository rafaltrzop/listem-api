const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');

const app = express();
require('dotenv').config();
const routes = require('./src/routes');
require('./src/services/passport.service');

app.use(helmet());
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());
app.use('/api', routes.publicRoutes);
app.use(
  '/api',
  (req, res, next) => {
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
  },
  routes.privateRoutes,
);

if (process.env.NODE_ENV === 'development') {
  const swaggerDocument = yaml.safeLoad(fs.readFileSync('./docs/swagger.yml', 'utf8'));
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, { customSiteTitle: 'Listem API' }),
  );
}

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
        detail: err.stack.split('\n'), // TODO: send stack trace only in development
      },
    ],
  });
});

module.exports = app;
