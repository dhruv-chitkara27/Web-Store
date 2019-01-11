const express = require('express')
const router = express.Router()
const User = require('../models/User')
const passport =  require('passport')

router.post('/', passport.authenticate('localLogin',{
  successRedirect: '/account'
}))
module.exports = router
