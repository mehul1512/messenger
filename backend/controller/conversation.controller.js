const ConversationModel = require('../models/conversation.model');

//new conversation
const newConversation = async (req, res) => {
    const { sender_id, receiver_id } = req.body;
    try {
        //create conversation
        const result = await ConversationModel.create({
            members: [sender_id, receiver_id],
        });

        res.status(200).json({ code: 200, result });
    } catch (err) {
        return res
            .status(500)
            .json({ code: 500, message: 'Something went to wrong!!' });
    }
};

//get conversation of user
const getConversationOfUser = async (req, res) => {
    const id = req.params.user_id;
    try {
        //get conversation of user
        const conversations = await ConversationModel.find({
            members: { $in: [id] },
        });

        res.status(200).json({ code: 200, conversations });
    } catch (err) {
        return res
            .status(500)
            .json({ code: 500, message: 'Something went to wrong!!' });
    }
};

// get conversation includes two users
const getConversationOfTwoUsers = async (req, res) => {
    const id1 = req.params.user_id1;
    const id2 = req.params.user_id2;

    try {
        const conversation = await ConversationModel.findOne({
            members: { $all: [id1, id2] },
        });

        res.status(200).json({ code: 200, conversation });
    } catch (err) {
        return res
            .status(500)
            .json({ code: 500, message: 'Something went to wrong!!' });
    }
};

module.exports = {
    newConversation,
    getConversationOfUser,
    getConversationOfTwoUsers,
};
