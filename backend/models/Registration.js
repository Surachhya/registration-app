const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  emailAddress: String,
  phone: String,
  campus: String,
  workshop: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Registration', registrationSchema);
