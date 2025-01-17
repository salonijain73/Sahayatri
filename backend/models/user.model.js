const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  designation: {
    type: String,
    required: true,
    trim: true
  },
  area: {
    type: String,
    required: true,
    trim: true,
    minlength: [1, 'Area cannot be empty']
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number']
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female']
  },
  transportMode: {
    type: String,
    required: true,
    enum: {
      values: ['Car', 'Bike', 'Public Transport', 'Walk'],
      message: 'Invalid transport mode'
    }
  },
  teamsEmail: {
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
      required: false
    }
  }
}, {
  timestamps: true
});

// Create a geospatial index for location-based queries
userSchema.index({ location: '2dsphere' });

const User = mongoose.model('User', userSchema);

module.exports = User;
