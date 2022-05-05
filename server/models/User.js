const Schema = require('mongoose').Schema
const mongoose = require('mongoose')

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: false
  }
})

const User = mongoose.model('user', userSchema)

module.exports = User
