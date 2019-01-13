const express = require('express')
const router = express.Router()
const Item = require('../models/Item')
/*
const items = [
  {name:'Item 1', description:'', price:10},
  {name:'Item 2', description:'', price:20},
  {name:'Item 3', description:'', price:15},
  {name:'Item 4', description:'', price:50},
  {name:'Item 5', description:'', price:35},
  {name:'Item 6', description:'', price:100}
]
*/
router.get('/', (req,res,next) => {
  const user = req.user
  if(user == null){
    res.redirect('/')
    return
  }
  Item.find(null, (err, items) => {
    if(err)
      return next(err)

    const data = {
      user: user,
      items: items
    }
    res.render('account', data)
  })
  })

router.get('/additem/:itemid', (req, res, next) => {
  const user = req.user
  if(user == null){
    res.redirect('/')
    return
  }

  Item.findById(req.params.itemid, (err, item) => {
    if(err){
      return next(err)
    }

    if(item.interested.indexOf(user._id) == -1){
      item.interested.push(user._id)
      item.save()
      res.json({
        item: item
      })
    }
    })
  })


router.get('/logout', (req,res,next) => {
  req.logout()
  res.redirect('/')
})

module.exports = router
