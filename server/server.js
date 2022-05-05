const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const routes = require('./routes/routes.js')

//initiate app
const app = express()

//middleware
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use((req, res, next) => {
  if(!req.headers.hasOwnProperty('transfer-encoding')){
    next()
  }
})

//routes
app.use('/', routes)

//start db connection and server
mongoose.connect('mongodb+srv://root:root@galacticempire.ljiyz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(res => {
  console.log('>> Connected to DB')
  app.listen(8080, () => {
    console.log('>> Listening on port 8080')
  })
})
