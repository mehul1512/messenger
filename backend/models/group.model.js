const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        about: {
            type: String,
            default: '',
        },
        type: {
            type: String,
            default: 'private',
        },
        members: {
            // conversation_id from Conversation table
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Group', GroupSchema);
