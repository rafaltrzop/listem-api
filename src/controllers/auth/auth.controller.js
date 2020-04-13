const passport = require('passport');
const { body } = require('express-validator');

const { VALIDATOR_MESSAGE } = require('../../utils/validation');
const { generateAccessToken, generateRefreshToken } = require('../../utils/auth');

module.exports = {
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

          const userId = user.id;
          const payload = {
            user: {
              id: userId,
            },
          };

          return res.json({
            data: {
              accessToken: generateAccessToken(payload),
              refreshToken: await generateRefreshToken(userId),
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
        .isString()
        .withMessage(VALIDATOR_MESSAGE.IS_STRING)
        .trim()
        .notEmpty()
        .withMessage(VALIDATOR_MESSAGE.NOT_EMPTY)
        .isEmail()
        .withMessage(VALIDATOR_MESSAGE.IS_EMAIL)
        .normalizeEmail(),
      body('password')
        .exists()
        .withMessage(VALIDATOR_MESSAGE.EXISTS)
        .isString()
        .withMessage(VALIDATOR_MESSAGE.IS_STRING)
        .notEmpty()
        .withMessage(VALIDATOR_MESSAGE.NOT_EMPTY),
    ];
  },
};
