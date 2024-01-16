const mongoose = require('mongoose');
const Notification = require('./notification.js');
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
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  last_name: {
    type: String,
    required: [true, "Please enter your lastname"]
  },
  first_name: {
    type: String,
    required: [true, "Please enter your firstname"],
  },
  reservations: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Reservation',
    },
  ],
  notifications: [Notification.schema],
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
