const mongoose = require('mongoose');

const ChatMessageSchema = new mongoose.Schema(
    {
        conversation_id: {
            type: String,
            required: true,
        },
        sender_id: {
            type: String,
            ref: 'User',
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('ChatMessage', ChatMessageSchema);
