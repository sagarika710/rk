const express = require('express');
const router = express.Router();
const { loginAdmin } = require('../controllers/authController');
// const { protect } = require('../middleware/authMiddleware'); // Use this later for protected routes

// Public: Admin Login
router.post('/login', loginAdmin);

// Example of a future protected route:
// router.post('/create-admin', protect, createAdminController);

module.exports = router;