const express = require('express');
const app = express();

app.use('/auth', require('./auth.route'));
app.use('/messages', require('./message.route'));
app.use('/conversations', require('./conversation.route'));
app.use('/users', require('./user.route'));

module.exports = app;
