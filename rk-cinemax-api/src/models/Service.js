const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    icon: { type: String, default: 'MonitorPlay' },
    features: { type: [String], default: [] }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Service', serviceSchema);
