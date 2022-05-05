const router = require('express').Router()
const jwt = require('jsonwebtoken')
const ServerResponse = require('../responseTemplate.js')
const User = require('../models/User.js')

//middleware to check if logged in
const authenticate = (req, res, next) => {
  if(!req.headers.hasOwnProperty('authorization')){
    return res.senStatus(401)
  }
  jwt.verify(req.headers.authorization, 'caden', (err, user) => {
    if(err){
      return res.sendStatus(401)
    }
    next()
  })
}

router.get('/api/health', (req, res) => {
  res.json(new ServerResponse('success'))
})

/*
Path: /register
Fields: username, password
Description: Route to register new users, checks if user exists and password match
*/

router.post('/api/register', async(req, res) => {
  try{
    console.log(req.body)
    //check if request has required fields
    if(req.body.hasOwnProperty('username') && req.body.hasOwnProperty('password')){

      //check if user already exists
      const user = await User.findOne({ username: req.body.username })

      //if user doesnt exist create
      if(user === null){
        await User.create({
          username: req.body.username,
          password: req.body.password
        })
        res.json(new ServerResponse('success', { registerSuccess: true }))
      } else {
        throw 'ERROR: User already exists'
      }
    } else {
      throw 'ERROR: Missing required field(s)'
    }

  }catch(err){
    console.log(err)
    res.json(new ServerResponse('error', {}, err))
  }
})

/*
Path: /login
Fields: username, password
Description: Route to login a users, checks if user exists and password match
*/

router.post('/api/login', async(req, res) => {
  try{

    //check if request has required fields
    if(req.body.hasOwnProperty('username') && req.body.hasOwnProperty('password')){

      //check if user exists
      let user = await User.findOne({ username: req.body.username })

      //if user exists
      if(user !== null && user.password === req.body.password){
        const accessToken = jwt.sign({ userId: user.id }, 'caden')
        user = user.toObject()
        delete user.password
        res.json(new ServerResponse('success', { accessToken, user }))
      } else {
        throw 'ERROR: Combination does not exist'
      }
    }
  }catch(err){
    console.log(err)
    res.json(new ServerResponse('error', {}, err))
  }
})

module.exports = router;
