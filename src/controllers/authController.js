const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Session lasts 30 days
  });
};

// @desc    Auth user & get token
// @route   POST /api/admin/login
exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1. Check if user exists
    const user = await User.findOne({ username });

    // 2. Check if password matches
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        token: generateToken(user._id), // <--- The key to the castle
      });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};