const { Unauthorized } = require('rest-api-errors');

/**
 * Provide passport authenticate strategies
 *
 *   here you should register your strategies callbacks to create ne user
 *   and use it in ./Passport.js
 *
 * **/

class PassportStrategies {
  _User: any;
  constructor(User: any) {
    this._User = User;
    this.local = this.local.bind(this);
    // this.google = this.google.bind(this);
    // this.facebook = this.facebook.bind(this);
    // this.instagram = this.instagram.bind(this);
  }

  local(username: any, password: any, done: (arg0: null, arg1: any) => any) {
    const error = new Unauthorized(401, 'Incorrect username or password.');
    this._User
      .findOne({ email: username })
      .then((user: { authenticate: (arg0: any, arg1: (err: any, userData: any) => any) => any }) =>
        user
          ? user.authenticate(password, (err: any, userData: any) => (userData ? done(null, user) : done(error, false)))
          : done(error, false)
      )
      .catch(done);
  }
  // extend if needed
  // google(accessToken, refreshToken, profile, done) {}
  // facebook(accessToken, refreshToken, profile, done) {}
  // instagram(req, accessToken, refreshToken, profile, done) {}
}

export default PassportStrategies;
