const ChatMessage = require('../models/chatmessage.model');

// add chat message
const addChatMessage = async (req, res) => {
    const { sender_id, conversation_id, message } = req.body;
    try {
        //save message
        const result = await ChatMessage.create({
            conversation_id,
            sender_id,
            message,
        });

        res.status(200).json({ code: 200, result });
    } catch (err) {
        return res
            .status(500)
            .json({ code: 500, message: 'Something went to wrong!!' });
    }
};

//get chat of conversation
const getChatMessageOfUser = async (req, res) => {
    const id = req.params.conversation_id;
    try {
        const messages = await ChatMessage.find({
            conversation_id: id,
        });

        res.status(200).json({ code: 200, messages });
    } catch (err) {
        return res
            .status(500)
            .json({ code: 500, message: 'Something went to wrong!!' });
    }
};

module.exports = { addChatMessage, getChatMessageOfUser };
