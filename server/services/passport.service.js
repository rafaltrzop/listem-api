const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const models = require('../models');
const User = models.User;

passport.use('signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await User.create({email, password});
    return done(null, user);
  } catch (error) {
    done(error);
  }
}));

passport.use('login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await User.findOne({where: {email}});

    if (!user) {
      return done(null, false, {message: 'User not found'}); // TODO: change message
    }

    const validate = await user.isValidPassword(password);
    if (!validate) {
      return done(null, false, {message: 'Wrong password'}); // TODO: change message
    }

    return done(null, user, {message: 'Logged in successfully'}); // TODO: remove unnecessary message?
  } catch (error) {
    return done(error);
  }
}));

passport.use(new JwtStrategy({
  secretOrKey : 'top_secret', // TODO: use the same secret when signing
  jwtFromRequest : ExtractJwt.fromUrlQueryParameter('secret_token')
}, (token, done) => {
  try {
    return done(null, token.user);
  } catch (error) {
    done(error);
  }
}));
