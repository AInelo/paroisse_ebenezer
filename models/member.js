const mongoose = require('mongoose')

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide name'],
    trim: true,
  },
  lastname: {
    type: String,
    required: [true, 'must provide lastname'],
    trim: true,
  },
  url: {
    type: String,
    required: true
  },
  
})

module.exports = mongoose.model('membre', memberSchema)