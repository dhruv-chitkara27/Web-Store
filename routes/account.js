const express = require('express')
const router = express.Router()

router.get('/', (req,res,next) => {
  const user = req.user
  if(user == null){
    res.redirect('/')
    return
  }
  const data = {
    user: user
  }
  res.render('account',data)
  })

router.get('/logout', (req,res,next) => {
  req.logout()
  res.redirect('/')
})

module.exports = router
