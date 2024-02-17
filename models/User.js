const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    // required: [true, 'must provide username'],
    trim: true,
  },
  password: {
    type: String,
    // required: [true, 'must provide password'],
    trim: true,
  }
})

module.exports = mongoose.model('User', userSchema)