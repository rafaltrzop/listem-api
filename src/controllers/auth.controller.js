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
                title: info.message,
              },
            ],
          });
        }

        req.login(user, { session: false }, (err) => {
          if (err) return next(err);

          // TODO: verify payload structure, send only user id?
          const payload = {
            user: {
              id: user.id,
              email: user.email,
            },
          };
          const secret = process.env.JWT_SECRET;
          const token = jwt.sign(payload, secret); // TODO: set options https://github.com/auth0/node-jsonwebtoken

          return res.json({
            data: {
              token,
            },
          });
        });
      } catch (err) {
        return next(err);
      }
    })(req, res, next);
  },
});
