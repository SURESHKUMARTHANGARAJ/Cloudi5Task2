const mongoose = require('mongoose');

const TalukaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  altName: {
    type: String,
    trim: true
  },
  districtCode: {
    type: String,
    required: true,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Taluka', TalukaSchema);
