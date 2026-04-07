const express = require('express');
const router = express.Router();
const { getPromos, createPromo, updatePromo, deletePromo } = require('../controllers/promoController');
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../config/cloudinary');

router.get('/', getPromos);
router.post('/', protect, upload.single('image'), createPromo);
router.put('/:id', protect, upload.single('image'), updatePromo);
router.delete('/:id', protect, deletePromo);

module.exports = router;
