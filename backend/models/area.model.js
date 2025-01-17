const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const areaSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
}, {
  timestamps: true,
});

// Create text index for search functionality
areaSchema.index({ name: 'text' });

const Area = mongoose.model('Area', areaSchema);

module.exports = Area;
