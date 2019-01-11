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
    passReqToCallback: true
  }, (req, email, password, next) => {

    User.findOne({email: email}, (err, user) => {
      if (err){
        return next(err)
      }

      // user not found:
      if (user == null)
        return next(new Error('User Not Found'))

      // check password:
      if (user.password != req.body.password){
        return next(new Error('Incorrect Password'))
      }
        return next(null, user)
      //res.json({
        //confirmation:'success',
        //user: user
      //})
    })


  })
    passport.use('localLogin', localLogin)
}
