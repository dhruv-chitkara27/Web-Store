const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.post('/', (req, res, next) => {
	const email = req.body.email

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

		res.json({
			confirmation:'success',
			user: user
		})
	})


})

module.exports = router
