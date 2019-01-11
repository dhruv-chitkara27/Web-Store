const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

module.exports = (passport) => {

  passport.serializeUser((user, next) => {
    next(null, user)
  })

  passport.deserializeUser((id, next) => {
    User.findById(id, (err, user) => {
      next(err, user)
    })
  })

  const localLogin = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback; true
  }, (req, email, password, next) => {
  })
}
