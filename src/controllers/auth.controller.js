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
                title: info.message,
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

          // TODO: save access token and refresh token in database
          const refreshToken = uuidv4();
          // const { refreshToken } = await models.Token.create({ userId: user.id });

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
