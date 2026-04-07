const Movie = require('../models/Movie');
const { cloudinary } = require('../config/cloudinary');

exports.getMovies = async (req, res) => {
  console.log('🔥 GET /api/movies called');
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createMovie = async (req, res) => {
  try {
    const { title, rating, genre, language, duration, description, trailerUrl, showtimes, bookingLink, isNowShowing, isComingShowing } = req.body;
    const posterUrl = req.file?.path || req.body.posterUrl || req.body.poster;
    const cloudinaryId = req.file?.filename || '';

    if (!posterUrl) {
      return res.status(400).json({ message: "Poster image or poster URL is required" });
    }

    const newMovie = new Movie({
      title,
      posterUrl,
      cloudinaryId,
      rating,
      genre: Array.isArray(genre) ? genre : genre ? genre.split(',') : [],
      language,
      duration,
      description,
      trailerUrl,
      showtimes: Array.isArray(showtimes) ? showtimes : showtimes ? showtimes.split(',') : [],
      bookingLink,
      isNowShowing: typeof isNowShowing === 'boolean' ? isNowShowing : isNowShowing === 'true',
      isComingShowing: typeof isComingShowing === 'boolean' ? isComingShowing : isComingShowing === 'true'
    });

    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const { title, rating, genre, language, duration, description, trailerUrl, showtimes, bookingLink, isNowShowing, isComingShowing } = req.body;

    if (req.file) {
      if (movie.cloudinaryId) {
        await cloudinary.uploader.destroy(movie.cloudinaryId);
      }
      movie.posterUrl = req.file.path;
      movie.cloudinaryId = req.file.filename;
    } else if (req.body.posterUrl || req.body.poster) {
      movie.posterUrl = req.body.posterUrl || req.body.poster;
      movie.cloudinaryId = '';
    }

    movie.title = title ?? movie.title;
    movie.rating = rating ?? movie.rating;
    movie.genre = Array.isArray(genre) ? genre : genre ? genre.split(',') : movie.genre;
    movie.language = language ?? movie.language;
    movie.duration = duration ?? movie.duration;
    movie.description = description ?? movie.description;
    movie.trailerUrl = trailerUrl ?? movie.trailerUrl;
    movie.showtimes = Array.isArray(showtimes) ? showtimes : showtimes ? showtimes.split(',') : movie.showtimes;
    movie.bookingLink = bookingLink ?? movie.bookingLink;
    movie.isNowShowing = typeof isNowShowing === 'boolean' ? isNowShowing : isNowShowing === 'true' ? true : isNowShowing === 'false' ? false : movie.isNowShowing;
    movie.isComingShowing = typeof isComingShowing === 'boolean' ? isComingShowing : isComingShowing === 'true' ? true : isComingShowing === 'false' ? false : movie.isComingShowing;

    const updatedMovie = await movie.save();
    res.json(updatedMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Delete a movie (Admin only)
// @route   DELETE /api/movies/:id
exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    // 1. Delete image from Cloudinary
    if (movie.cloudinaryId) {
      await cloudinary.uploader.destroy(movie.cloudinaryId);
    }

    // 2. Delete movie from DB
    await movie.deleteOne();

    res.json({ message: "Movie removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
