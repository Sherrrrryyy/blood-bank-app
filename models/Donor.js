const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bloodGroup: { type: String, required: true },
  availability: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.models.Donor || mongoose.model('Donor', donorSchema);
