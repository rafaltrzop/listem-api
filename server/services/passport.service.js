const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const models = require('../models');

const { User } = models;

passport.use('signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  try {
    const user = await User.create({ email, password });
    return done(null, { id: user.id, email: user.email });
  } catch (error) {
    done(error);
  }
}));

passport.use('login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  try {
    const user = await User.findOne({
      where: { email },
      attributes: ['id', 'email'],
    });

    if (!user) {
      return done(null, false, { message: 'User not found' }); // TODO: change message
    }

    const validate = await user.isValidPassword(password);
    if (!validate) {
      return done(null, false, { message: 'Wrong password' }); // TODO: change message
    }

    return done(null, user, { message: 'Logged in successfully' }); // TODO: remove unnecessary message?
  } catch (error) {
    return done(error);
  }
}));

passport.use(new JwtStrategy({
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderAsBearerToken(),
    ExtractJwt.fromUrlQueryParameter('token'),
  ]),
}, (token, done) => {
  try {
    return done(null, token.user);
  } catch (error) {
    done(error);
  }
}));
