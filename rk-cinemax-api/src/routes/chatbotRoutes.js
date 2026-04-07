const express = require('express');
const router = express.Router();
const {
  getAllChatbotOptions,
  getChatbotOptions,
  getChatbotResponse,
  createChatbotOption,
  updateChatbotOption,
  deleteChatbotOption
} = require('../controllers/chatbotController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getAllChatbotOptions);
// Get all chatbot options
router.get('/options', getChatbotOptions);

// Get response for selected option
router.post('/message', getChatbotResponse);
router.post('/', protect, createChatbotOption);
router.put('/:id', protect, updateChatbotOption);
router.delete('/:id', protect, deleteChatbotOption);

module.exports = router;
