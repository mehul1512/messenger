const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = async (req, res, next) => {
    let token, decodedData;
    try {
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                code: 401,
                message: 'Not authorized , Token Mismatch found',
            });
        }

        decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY); //compare
        res.locals.userId = decodedData.id; // assign userId to res

        next();
    } catch (err) {
        res.status(401);
        res.status(401).json({
            code: 401,
            message: 'Something went to wrong!!',
            err: err,
        });
    }
};

module.exports = { authMiddleware };
