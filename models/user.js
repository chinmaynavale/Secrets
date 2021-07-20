const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');
require('dotenv').config();

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.plugin(encrypt, {
  secret: process.env.SECRET,
  encryptedFields: ['password'],
});

module.exports = new mongoose.model('User', userSchema);
