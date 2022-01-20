const express = require('express');
const {
    newConversation,
    getConversationOfUser,
    getConversationOfTwoUsers,
} = require('../controller/conversation.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

const router = express.Router();

//new conversation
router.post('/', authMiddleware, newConversation);

//get conversation of user
router.get('/:user_id', authMiddleware, getConversationOfUser);

// get conversation includes two users
router.get('/:user_id1/:user_id2', authMiddleware, getConversationOfTwoUsers);

module.exports = router;
