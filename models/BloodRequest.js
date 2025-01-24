const mongoose = require('mongoose');

const bloodRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bloodGroup: { type: String, required: true },
  reason: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.models.BloodRequest || mongoose.model('BloodRequest', bloodRequestSchema);
