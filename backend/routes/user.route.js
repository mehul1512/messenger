const express = require('express');
const { getUserData } = require('../controller/user.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

const router = express.Router();

// get a user data
router.get('/', getUserData); // authMiddleware,

module.exports = router;
