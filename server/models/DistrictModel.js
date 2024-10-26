const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema({
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
  stateCode: { 
    type: String, 
    required: true 
},
  isActive: { 
    type: Boolean, 
    default: true 
}}
);

module.exports = mongoose.model('District', districtSchema);
