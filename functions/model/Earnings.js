const mongoose = require('mongoose');

const earningsSchema = new mongoose.Schema({
  driver_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
  ride_id: { type: mongoose.Schema.Types.ObjectId, required: true }, // Reference to the ride collection if there is one
  amount: { type: mongoose.Types.Decimal128, required: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Earnings', earningsSchema);
