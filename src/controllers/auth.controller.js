const passport = require('passport');
const jwt = require('jsonwebtoken');

module.exports = (models) => ({
  index(req, res, next) {
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
});
