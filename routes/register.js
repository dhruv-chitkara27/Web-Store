const express = require('express')
const router = express.Router()
const passport = require('passport')


router.post('/',passport.authenticate('localRegister', {
  successRedirect: '/account'
}))
module.exports = router
