const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')
const bcrypt = require('bcryptjs')


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
		//	if (user.password != req.body.password){
			//	return next(new Error('Incorrect Password'))
			//}

      if(bcrypt.compareSync(password, user.password) == false)
        return next(new Error('Incorrect Password'))

			return next(null, user)
		})
	})

	passport.use('localLogin', localLogin)

	const localRegister = new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, (req, email, password, next) => {
		User.findOne({email: email}, (err, user) => {
			if (err){
				return next(err)
			}

			if (user != null)
				return next(new Error('User already exists, please log in.'))

			// create the new user:
      const hashedPw = bcrypt.hashSync(password, 10)
      let isAdmin = false
      if (email.indexOf('@chitkara.edu.in') != -1)
          isAdmin = true
			User.create({email:email, password:hashedPw, isAdmin:isAdmin}, (err, user) => {
				if (err)
					return next(err)

				next(null, user)
			})
		})
	})

	passport.use('localRegister', localRegister)
}
