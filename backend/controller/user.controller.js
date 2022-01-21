const User = require('../models/user.model');

// get a user data
const getUserData = async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;

    try {
        const user = userId
            ? await User.findById(userId)
            : await User.findOne({ name: username });
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json({ code: 200, result: other });
    } catch (err) {
        res.status(500).json({
            code: 500,
            message: 'Something went to wrong!!',
            err,
        });
    }
};

module.exports = { getUserData };
