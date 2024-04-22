const mongoose = require('mongoose');

const fareProposalSchema = new mongoose.Schema({
  ride_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Ride', required: true },
  driver_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
  proposed_fare: { type: mongoose.Types.Decimal128, required: true },
  status: { type: String, enum: ['proposed', 'accepted', 'rejected'], default: 'proposed' },
}, { timestamps: true });

module.exports = mongoose.model('FareProposal', fareProposalSchema);
