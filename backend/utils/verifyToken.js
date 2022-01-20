const jwt = require('jsonwebtoken');

const verifyToken = (token) => {
    let token, decodedData;
    try {
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return false;
        }

        decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY); //compare
        return true;
    } catch (err) {
        throw new Error(err);
    }
};

module.exports = verifyToken;
