const mongoose = require('mongoose');

const firmSchema = new mongoose.Schema({
  logo: {
    type: String
  },
  firmName: {
    type: String,
    required: true,
  },
  altFirmName: String,
  ownerName: String,
  email: String,
  website: String,
  mobile: String,
  address: {
    country: String,
    state: String,
    district: String,
    taluka: String,
    pincode: String,
    address: String,
  },
  otherDetails: {
    panNo: String,
    tanNo: String,
    gstNo: String,
    fssaiNo: String,
    cinNo: String,
    contactNo: String,
    status: {
      type: Boolean,
      default: false,
    },
  },
});

module.exports = mongoose.model('Firm', firmSchema);
