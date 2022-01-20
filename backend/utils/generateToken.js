const jwt = require('jsonwebtoken');

const generateToken = (email, id, time) => {
    return jwt.sign({ email, id }, process.env.JWT_SECRET_KEY, {
        expiresIn: time,
    });
};

module.exports = generateToken;
