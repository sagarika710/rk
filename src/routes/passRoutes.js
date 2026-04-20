const express = require('express');
const router = express.Router();
const {
  getPasses,
  createPass,
  updatePass,
  deletePass
} = require('../controllers/passController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getPasses);
router.post('/', protect, createPass);
router.put('/:id', protect, updatePass);
router.delete('/:id', protect, deletePass);

module.exports = router;
