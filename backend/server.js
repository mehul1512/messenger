const express = require('express');
const connectDB = require('./config/db');
const http = require('http');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(helmet());
const server = http.createServer(app);
const port = process.env.PORT || 5000;

app.set('port', port);

// DB Connection
connectDB();

// Production API LOG
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        credentials: true,
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    })
);

// Routes
app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/messages', require('./routes/message.route'));
app.use('/api/conversation', require('./routes/conversation.route'));
app.use('/api/users', require('./routes/user.route'));

app.get('/', (req, res) => {
    res.send('API IS RUNNING');
});

server.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
