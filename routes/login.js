const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.post('/', (req,res,next) => {
      const email = req.body.email
      User.find({email: email}, (err, users) => {
        if(err){
          res.json({
            confirmation: 'fail',
            error: err
          })

          return
        }

        if(users.length == 0){
          res.json({
            confirmation: 'fail',
            error: 'User not found'
          })
          return
        }

        const user = users[0]

        //CHECK PASSWORD
        if(user.password != req.body.password){
          res.json({
            confirmation: 'fail',
            error: 'Incorrect Password'
          })
          return
        }

        res.json({
          confirmation:'success',
          user: users
        })
      })
})

module.exports = router
