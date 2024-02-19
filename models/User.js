const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Veuillez fournir un nom d\'utilisateur.'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Veuillez fournir un mot de passe.'],
    trim: true,
  }
});

module.exports = mongoose.model('User', userSchema);
