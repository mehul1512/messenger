const express = require('express');
const {
    getChatMessageOfUser,
    addChatMessage,
} = require('../controller/message.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

const router = express.Router();

// add message
router.post('/', addChatMessage); // authMiddleware,

//get chat of user
router.get('/:conversation_id', getChatMessageOfUser); // authMiddleware,

module.exports = router;
