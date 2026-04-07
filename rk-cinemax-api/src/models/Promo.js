const mongoose = require('mongoose');

const promoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  content: {
    type: String,
    default: ""
  },

  imageUrl: {
    type: String,
    required: true
  },

  cloudinaryId: {
    type: String,
    default: ""
  },

  type: {
    type: String,
required: true
  },

  isActive: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

module.exports = mongoose.model('Promo', promoSchema);
