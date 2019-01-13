const express = require('express')
const router = express.Router()
const Item = require('../models/Item')

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

module.exports = router
