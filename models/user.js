const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: [true, "Please enter your lastname"]
  },
  first_name: {
    type: String,
    required: [true, "Please enter your firstname"],
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
