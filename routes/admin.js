const express = require('express')
const router = express.Router()
const Item = require('../models/Item')

router.get('/', (req, res, next) => {
	const user = req.user
	if (user == null){
		res.redirect('/')
		return
	}

	if (user.isAdmin == false){
		res.redirect('/')
		return
	}

	Item.find(null, (err, items) => {
		if (err)
			return next(err)


		const data = {
			user: user,
			items: items
		}

		res.render('admin', data)
	})

})

router.post('/additem', (req, res, next) => {
	const user = req.user
	if (user == null){
		res.redirect('/')
		return
	}

	if (user.isAdmin == false){
		res.redirect('/')
		return
	}

	Item.create(req.body, (err, item) => {
		if (err){
			return next(err)
		}

		res.redirect('/admin')
	})


})

module.exports = router
