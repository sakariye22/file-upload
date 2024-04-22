const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  driver_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: false }, // Now optional, as no driver is assigned initially.
  pickup_latitude: { type: mongoose.Types.Decimal128, required: true },
  pickup_longitude: { type: mongoose.Types.Decimal128, required: true },
  dropoff_latitude: { type: mongoose.Types.Decimal128, required: true },
  dropoff_longitude: { type: mongoose.Types.Decimal128, required: true },
  status: { type: String, enum: ['requested', 'accepted', 'enroute', 'completed'], default: 'requested' },
  fare_status: { type: String, enum: ['waiting_for_proposals', 'negotiating', 'accepted'], default: 'waiting_for_proposals' },
}, { timestamps: true });

module.exports = mongoose.model('Ride', rideSchema);
