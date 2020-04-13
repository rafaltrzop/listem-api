const passport = require('passport');
const { validationResult } = require('express-validator');

function authenticate(req, res, next) {
  passport.authenticate('jwt', { session: false }, (error, user, info) => {
    if (error) return next(error);

    if (!user) {
      return res.status(401).json({
        errors: [
          {
            code: 'INVALID_ACCESS_TOKEN',
            title: 'Missing or expired access token',
          },
        ],
      });
    }

    next();
  })(req, res, next);
}

function validate(validations) {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(422).json({ errors: errors.array() });
  };
}

module.exports = {
  authenticate,
  validate,
};
