const express = require('express');
const {
    LoginUser,
    registerUser,
    LogoutUser,
} = require('../controller/auth.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', LoginUser);
router.post('/logout', authMiddleware, LogoutUser);

module.exports = router;
