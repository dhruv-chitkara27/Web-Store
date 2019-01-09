const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.post('/', (req,res,next) => {
    User.create(req.body, (err, user) => {
      if(err){
        res.json({
          confirmation: 'fail',
          error: err
        })
        return
      }

      res.json({
        confirmation: 'success',
        user: user
      })
    })
})

module.exports = router
