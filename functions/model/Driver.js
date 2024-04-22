const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone_number: { type: String, required: false },
  license_number: { type: String, required: false},
  avatar: { type: String, required: false},
  is_active: { type: Boolean, default: false },
  latitude: { type: mongoose.Types.Decimal128, default: null },
  longitude: { type: mongoose.Types.Decimal128, default: null },
  profilePictureUrl: { type: String, required: false, default: '' } ,
  driverLicense: { type: String, required: false, default: '' } 
}, { timestamps: true });

module.exports = mongoose.model('Driver', driverSchema);
