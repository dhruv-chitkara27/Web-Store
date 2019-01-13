const mongoose = require('mongoose')

const Item = new mongoose.Schema({
  name: {type:String, default:''},
  description: {type:String, default:''},
  price: {type:Number, default:0},
  interested: {type:Array, default:[]}, //array of IDs of users interested in the item
  time
})

module.exports = mongoose.model('Item' , Item)
