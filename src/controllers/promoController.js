const Promo = require('../models/Promo');
const { cloudinary } = require('../config/cloudinary');

// @desc    Get all ACTIVE promos (Public)
// @route   GET /api/promos
exports.getPromos = async (req, res) => {
  try {
    // Only fetch promos where isActive is true
    const promos = await Promo.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(promos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create a new Promo (Admin)
// @route   POST /api/promos
exports.createPromo = async (req, res) => {
  try {
    const { title, type, content } = req.body;
    const imageUrl = req.file?.path || req.body.imageUrl || req.body.image;
    const cloudinaryId = req.file?.filename || '';

    if (!imageUrl) {
      return res.status(400).json({ message: "Image or image URL is required" });
    }

    const newPromo = new Promo({
      title,
      content,
      imageUrl,
      cloudinaryId,
      type: type 
    });

    const savedPromo = await newPromo.save();
    res.status(201).json(savedPromo);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updatePromo = async (req, res) => {
  try {
    const promo = await Promo.findById(req.params.id);

    if (!promo) {
      return res.status(404).json({ message: "Promo not found" });
    }

    if (req.file) {
      if (promo.cloudinaryId) {
        await cloudinary.uploader.destroy(promo.cloudinaryId);
      }
      promo.imageUrl = req.file.path;
      promo.cloudinaryId = req.file.filename;
    } else if (req.body.imageUrl || req.body.image) {
      promo.imageUrl = req.body.imageUrl || req.body.image;
      promo.cloudinaryId = '';
    }

    promo.title = req.body.title ?? promo.title;
    promo.type = req.body.type ?? promo.type;
    promo.content = req.body.content ?? promo.content;

    const updatedPromo = await promo.save();
    res.json(updatedPromo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// @desc    Delete Promo (Admin)
// @route   DELETE /api/promos/:id
exports.deletePromo = async (req, res) => {
  try {
    const promo = await Promo.findById(req.params.id);
    if (!promo) return res.status(404).json({ message: "Promo not found" });

    // Delete image from Cloudinary
    if (promo.cloudinaryId) {
      await cloudinary.uploader.destroy(promo.cloudinaryId);
    }
    
    await promo.deleteOne();
    res.json({ message: "Promo removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
