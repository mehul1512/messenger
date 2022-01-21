const express = require('express');
const {
    newConversation,
    getConversationOfUser,
    getConversationOfTwoUsers,
} = require('../controller/conversation.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

const router = express.Router();

//new conversation
router.post('/', newConversation); // authMiddleware,

//get conversation of user
router.get('/:user_id', getConversationOfUser); // authMiddleware,

// get conversation includes two users
router.get('/:user_id1/:user_id2', getConversationOfTwoUsers); // authMiddleware,

module.exports = router;
