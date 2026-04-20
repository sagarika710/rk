const mongoose = require('mongoose');

const passSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  description: String,
  icon: String,
  popular: { type: Boolean, default: false },
  features: [String]
}, { timestamps: true });

module.exports = mongoose.model('Pass', passSchema);
