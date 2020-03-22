const passport = require('passport');
const jwt = require('jsonwebtoken');
const { body } = require('express-validator');
const PasswordValidator = require('password-validator');

const { VALIDATOR_MESSAGE } = require('../utils/validation');

module.exports = (models) => ({
  login(req, res, next) {
    passport.authenticate('login', (error, user, info) => {
      try {
        if (error) return next(error);

        if (!user) {
          return res.status(401).json({
            errors: [
              {
                code: info.code,
                title: info.message,
              },
            ],
          });
        }

        req.login(user, { session: false }, async (err) => {
          if (err) return next(err);

          // TODO: what should be in the payload?
          //  - is it safe to store user id in JWT?
          //  - what if user changes email address?
          const payload = {
            user: {
              id: user.id,
              email: user.email,
            },
          };
          const secret = process.env.JWT_SECRET;
          const options = {
            expiresIn: '3m',
          };
          const accessToken = jwt.sign(payload, secret, options);

          // TODO: add try catch or .catch((err) => {})
          const token = models.Token.build({ userId: user.id });
          const { refreshToken } = token;
          await token.save();

          return res.json({
            data: {
              accessToken,
              refreshToken,
            },
          });
        });
      } catch (err) {
        return next(err);
      }
    })(req, res, next);
  },
  loginRequest() {
    return [
      body('email')
        .exists()
        .withMessage(VALIDATOR_MESSAGE.EXISTS)
        .trim()
        .notEmpty()
        .withMessage(VALIDATOR_MESSAGE.NOT_EMPTY)
        .isEmail()
        .withMessage(VALIDATOR_MESSAGE.IS_EMAIL)
        .normalizeEmail(),
      body('password')
        .exists()
        .withMessage(VALIDATOR_MESSAGE.EXISTS)
        .notEmpty()
        .withMessage(VALIDATOR_MESSAGE.NOT_EMPTY)
        .isString()
        .withMessage(VALIDATOR_MESSAGE.IS_STRING)
        .custom((password) => {
          const passwordSchema = new PasswordValidator();
          passwordSchema
            .is()
            .min(8)
            .is()
            .max(64)
            .has()
            .uppercase()
            .has()
            .lowercase()
            .has()
            .digits()
            .has()
            .symbols()
            .has()
            .not()
            .spaces();

          const failedPasswordRules = passwordSchema.validate(password, { list: true });
          if (failedPasswordRules.length) {
            const failedRules = failedPasswordRules.join(', ');
            throw new Error(`Invalid password format (failed rules: ${failedRules})`);
          }

          return true;
        }),
    ];
  },
});
