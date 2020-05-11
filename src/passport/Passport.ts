import passportNPM from 'passport';
const { Strategy: LocalStrategy } = require('passport-local');

const { User } = require('../models/user');
import PassportStrategies from './PasportStrategies';

/**
 * Provide passport authenticate logic
 *
 *  @example
 *         ./index.js
 *         app.use(passport.init())
 * **/

class Passport {
  _passport: passportNPM.PassportStatic;
  _strategies: PassportStrategies;
  constructor() {
    this._passport = passportNPM;
    this._strategies = new PassportStrategies(User);

    this._passport.use(
      new LocalStrategy(
        {
          usernameField: 'email',
          passwordField: 'password'
        },
        this._strategies.local
      )
    );
  }

  init() {
    this._passport.serializeUser(User.serializeUser());
    this._passport.deserializeUser(User.deserializeUser());

    return this._passport.initialize();
  }
}

const passport = new Passport();

export default passport;
