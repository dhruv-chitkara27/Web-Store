const express = require('express')
const router = express.Router()
const Mailgun = require('mailgun-js')
const Item = require('../models/Item')
const User = require('../models/User')

const randomString = (length) => {
	let text = ''
	const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
	for (let i=0; i<length; i++){
		text += possible.charAt(Math.floor(Math.random() * possible.length))
	}

	return text
}

router.get('/', (req, res, next) => {
	const user = req.user
	if (user == null){
		res.redirect('/')
		return
	}

	Item.find(null, (err, items) => {
		if (err)
			return next(err)

		Item.find({interested: user._id}, (err, interestedItems) => {
			if (err)
				return next(err)

			const data = {
				user: user,
				items: items,
				interested: interestedItems
			}

			res.render('account', data)
		})
	})
})

router.get('/additem/:itemid', (req, res, next) => {
	const user = req.user
	if (user == null){
		res.redirect('/')
		return
	}

	Item.findById(req.params.itemid, (err, item) => {
		if (err){
			return next(err)
		}

		if (item.interested.indexOf(user._id) == -1){
			item.interested.push(user._id)
			item.save()
			res.redirect('/account')
		}
	})
})

router.get('/logout', (req, res, next) => {
	req.logout()
	res.redirect('/')
})

router.post('/resetpassword', (req, res, next) => {

	User.findOne({email: req.body.email}, (err, user) => {
		if (err)
			return next(err)

		user.nonce = randomString(8)
		user.passwordResetTime = new Date()
		user.save()

		const mailgun = Mailgun({
			apiKey: 'd199003bbe4a37d0ae84bd27cdfb871a-060550c6-773726af',
			domain: 'sandbox321b2d4e39dd4305b9aeddd472a101cf.mailgun.org'
		})

		const data = {
			to: req.body.email,
			from: 'dhruvchitkara27@gmail.com',
			sender: 'Web-Store',
			subject: 'Password Reset Request',
			html: 'Please click <a style="color:red" href="http://localhost:5000/account/password-reset?nonce='+user.nonce+'&id='+user._id+'">HERE</a> to reset your password. This link is valid for 24 hours.'
		}

		mailgun.messages().send(data, (err, body) => {
			if (err)
				return next(err)

			// success:
			res.json({
				confirmation: 'success',
				data: 'reset password endpoint',
				user: user
			})
		})
	})
})

router.get('/password-reset', (req, res, next) => {
  const nonce = req.query.nonce
  if(nonce == null){
    return next(new Error('Invalid Request'))
  }

  const user_id = req.query.id
  if (user_id == null){
    return next(new Error('Invalid Request'))
  }

  User.findById(user_id, (err, user) => {
    if(err){
      return next(new Error('Invalid Request'))
    }

    if(user.passwordResetTime == null){
      return next(new Error('Invalid Request'))
    }

    if(user.nonce == null){
      return next(new Error('Invalid Request'))
    }

    if(nonce != user.nonce){
      return next(new Error('Invalid Request'))
    }

    const now = new Date()
    const diff = now - user.passwordResetTime //time in milliseconds
    const seconds = diff/1000

    if(seconds > 24*60*60){
      return next(new Error('Invalid Request'))
    }

    // render the page where users can reset password

    res.json({
      user: user,
      diff: seconds
    })
  })

})

module.exports = router
