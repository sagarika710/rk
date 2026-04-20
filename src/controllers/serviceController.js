const Service = require('../models/Service');

exports.getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createService = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      features: Array.isArray(req.body.features)
        ? req.body.features
        : typeof req.body.features === 'string'
          ? req.body.features.split(',').map((item) => item.trim()).filter(Boolean)
          : []
    };

    const service = await Service.create(payload);
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateService = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      features: Array.isArray(req.body.features)
        ? req.body.features
        : typeof req.body.features === 'string'
          ? req.body.features.split(',').map((item) => item.trim()).filter(Boolean)
          : req.body.features
    };

    const service = await Service.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true
    });

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(service);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
