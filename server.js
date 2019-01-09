const express = require('express')
const path = require('path')
const home = require('./routes/home')

const app = express()
app.set('views' , path.join(__dirname, 'views'))
app.set('view engine' , 'hjs')

app.use(express.static(path.join(__dirname, 'public')))
app.use('/',home)

app.listen(5000)
console.log('App running on http://localhost:5000')
