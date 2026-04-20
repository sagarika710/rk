const express = require('express');
const router = express.Router();
const { submitQuery, getQueries } = require('../controllers/queryController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', submitQuery); // Public
router.get('/', protect, getQueries); // Admin only

module.exports = router;