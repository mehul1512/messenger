const express = require('express');
const {
    getChatMessageOfUser,
    addChatMessage,
} = require('../controller/message.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

const router = express.Router();

// add message
router.post('/', authMiddleware, addChatMessage);

//get chat of user
router.get('/:conversation_id', authMiddleware, getChatMessageOfUser);

module.exports = router;
