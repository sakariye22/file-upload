const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  driver_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
  vehicle_type: { type: String, enum: ['estate', 'suv', 'saloon', 'other'], required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  license_plate: { type: String, required: true },
  color: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);
