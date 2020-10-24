const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { v4: uuidv4 } = require('uuid');

const { User } = require('../models');

passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        await User.destroy({
          where: {
            email,
            isActive: false,
          },
        });

        const emailVerification = uuidv4();
        const [user, created] = await User.findOrCreate({
          where: { email },
          defaults: {
            passwordHash: password,
            emailVerificationHash: emailVerification,
          },
        });

        return done(null, {
          created,
          emailVerification,
          email: user.email,
        });
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({
          where: { email },
          attributes: ['id', 'passwordHash'],
        });

        if (!user) {
          return done(null, false, {
            code: 'WRONG_CREDENTIALS',
            message: 'Incorrect username or password',
          });
        }

        const validate = await user.isValidPassword(password);
        if (!validate) {
          return done(null, false, {
            code: 'WRONG_CREDENTIALS',
            message: 'Incorrect username or password',
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JwtStrategy(
    {
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        ExtractJwt.fromUrlQueryParameter('accessToken'),
      ]),
    },
    (accessToken, done) => {
      try {
        return done(null, accessToken.user);
      } catch (error) {
        done(error);
      }
    }
  )
);
