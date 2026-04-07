const mongoose = require('mongoose');

const chatbotOptionSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true
    },

    response: {
      type: String,
      required: true
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('ChatbotOption', chatbotOptionSchema);
