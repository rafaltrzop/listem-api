const passport = require('passport');
const jwt = require('jsonwebtoken');

module.exports = (models) => ({
  async index(req, res, next) {
    passport.authenticate('login', async (error, user, info) => {
      try {
        if (error) return next(error);

        if (!user) {
          const status = 401;
          return res.status(status).json({
            errors: [
              {
                status,
                title: info.message
              }
            ]
          });
        }

        req.login(user, {session: false}, async (error) => {
          if (error) return next(error);

          // TODO: verify payload structure
          const payload = {
            user: {
              id: user.id,
              email: user.email
            }
          };
          const secret = 'top_secret'; // TODO: keep it somewhere safe
          const token = jwt.sign(payload, secret); // TODO: set options https://github.com/auth0/node-jsonwebtoken

          // TODO: use JSON API valid response, send back user info?
          return res.json({
            data: {
              // user,
              token
            }
          });
        });
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  }
});
