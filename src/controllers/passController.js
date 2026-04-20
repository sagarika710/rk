const Pass = require('../models/Pass');

// GET passes
exports.getPasses = async (req, res) => {
  try {
    const passes = await Pass.find().sort({ price: 1 });
    res.json(passes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE pass
exports.createPass = async (req, res) => {
  try {
    const pass = await Pass.create(req.body);
    res.status(201).json(pass);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updatePass = async (req, res) => {
  try {
    const pass = await Pass.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!pass) {
      return res.status(404).json({ message: 'Pass not found' });
    }

    res.json(pass);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE pass
exports.deletePass = async (req, res) => {
  try {
    const pass = await Pass.findByIdAndDelete(req.params.id);
    if (!pass) {
      return res.status(404).json({ message: 'Pass not found' });
    }
    res.json({ message: 'Pass deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
