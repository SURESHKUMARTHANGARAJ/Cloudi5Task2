const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  altName: { 
    type: String 
  },
  code: { 
    type: String, 
    required: true, 
    unique: true 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  countrycode: { 
    type: String, 
    ref: 'Country', 
    required: true 
  } 
});

const State = mongoose.model('State', stateSchema);
module.exports = State;
