const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  posterUrl: { type: String, required: true }, // URL from Cloudinary or manual image URL
  cloudinaryId: { type: String, default: "" }, // To delete image later when uploaded to Cloudinary
  rating: { type: String, default: "UA" }, // U, UA, A
  genre: [String],
  language: { type: String, default: "" },
  releaseDate: Date,
  duration: String, // e.g., "2h 30m"
  description: String,
  trailerUrl: { type: String, default: "" },
  isNowShowing: { type: Boolean, default: true },
  isComingShowing: { type: Boolean, default: true },
  showtimes: [String], // e.g., ["10:00 AM", "02:00 PM"]
  bookingLink: { type: String, default: "" } // BookMyShow Link
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);
