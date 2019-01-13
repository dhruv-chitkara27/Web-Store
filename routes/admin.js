const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  const user = req.user
  if(user == null){
    res.redirect('/')
    return
  }

  if(user.isAdmin == false){
    res.redirect('/')
    return
  }

  const data = {
    user: user
  }
  res.render('admin', data)
})

module.exports = router
