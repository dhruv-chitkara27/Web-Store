const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const home = require('./routes/home')
const register = require('./routes/register')

mongoose.connect('mongodb://localhost/Web-Store', (err, data) => {
  if(err){
    console.log('DB Connection Failed')
    return
  }
  console.log('DB Connection Success')
})

const app = express()
app.set('views' , path.join(__dirname, 'views'))
app.set('view engine' , 'hjs')

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/',home)
app.use('/register', register)

app.listen(5000)
console.log('App running on http://localhost:5000')
