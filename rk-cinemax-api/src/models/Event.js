const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    image: { type: String, default: '' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
