const passport = require('passport');
const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4');

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
                title: info.title,
              },
            ],
          });
        }

        req.login(user, { session: false }, (err) => {
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

          return res.json({
            data: {
              accessToken,
              // TODO: save access token and refresh token in database
              refreshToken: uuidv4(),
            },
          });
        });
      } catch (err) {
        return next(err);
      }
    })(req, res, next);
  },
});
