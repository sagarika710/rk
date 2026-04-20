const express = require('express');
const router = express.Router();
const { getMovies, createMovie, updateMovie, deleteMovie } = require('../controllers/movieController');
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../config/cloudinary');

// Public Route: Anyone can see movies
router.get('/', getMovies);

// Protected Routes: Only Admin can add/delete
// upload.single('poster') handles the image upload
router.post('/', protect, upload.single('poster'), createMovie);
router.put('/:id', protect, upload.single('poster'), updateMovie);
router.delete('/:id', protect, deleteMovie);

module.exports = router;
