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
            max: 500,
        },
        type: {
            type: String,
            default: 'private',
        },
        conversation_id: {
            // conversation_id from Conversation table
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Group', GroupSchema);
