const Review = require('../models/Review');

// GET all reviews
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE review
exports.createReview = async (req, res) => {
  try {
    const { userName, userImage, rating, comment } = req.body;

    const review = await Review.create({
      userName,
      userImage,
      rating,
      comment
    });

    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE review
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
