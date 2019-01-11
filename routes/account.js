const express = require('express')
const router = express.Router()

router.get('/', (req,res,next) => {
    res.json({
      user: req.user || 'not logged in'
    })
  })

module.exports = router
