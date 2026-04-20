const ChatbotOption = require('../models/ChatbotOption');

exports.getChatbotOptions = async (req, res) => {
  const options = await ChatbotOption.find({ isActive: true });
  res.json(options);
};

exports.getAllChatbotOptions = async (req, res) => {
  const options = await ChatbotOption.find().sort({ createdAt: -1 });
  res.json(options);
};

exports.createChatbotOption = async (req, res) => {
  try {
    const option = await ChatbotOption.create(req.body);
    res.status(201).json(option);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateChatbotOption = async (req, res) => {
  try {
    const option = await ChatbotOption.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!option) {
      return res.status(404).json({ message: 'Chatbot option not found' });
    }

    res.json(option);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteChatbotOption = async (req, res) => {
  try {
    const option = await ChatbotOption.findByIdAndDelete(req.params.id);
    if (!option) {
      return res.status(404).json({ message: 'Chatbot option not found' });
    }
    res.json({ message: 'Chatbot option deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getChatbotResponse = async (req, res) => {
  const { id } = req.body;

  const option = await ChatbotOption.findById(id);

  if (!option) {
    return res.status(404).json({
      response: "Sorry, I didn’t understand that."
    });
  }

  res.json({
    label: option.label,
    response: option.response
  });
};
