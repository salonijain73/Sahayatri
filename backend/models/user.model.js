const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  area: {
    type: String,
    required: true,
    trim: true
  },
  transportMode: {
    type: String,
    required: true,
    enum: ['Car', 'Bike', 'Public Transport', 'Walk']
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female']
  },
  designation: {
    type: String,
    required: true,
    trim: true
  },
  teamsEmail: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      default: [72.8777, 19.0760] // Default coordinates for Mumbai
    }
  }
});

// Create a 2dsphere index for the location field
userSchema.index({ location: '2dsphere' });

const User = mongoose.model('User', userSchema);

module.exports = User;
