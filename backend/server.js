const express = require('express');
const connectDB = require('./config/db');
const http = require('http');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
dotenv.config();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;

// DB Connection
connectDB();

// Production API LOG
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.set('port', port);
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        credentials: true,
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    })
);

//store user profile picture
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage });
app.post('/api/upload', upload.single('file'), (req, res) => {
    try {
        return res.status(200).json('File uploaded successfully');
    } catch (error) {
        console.log(error);
    }
});

// Routes
app.use('/api', require('./routes/routes'));

// api testing route
app.get('/', (req, res) => {
    res.send('API IS RUNNING');
});

const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    },
});

//socket io
const {
    addUser,
    removeUser,
    getUser,
    listOfUsers,
} = require('./socket/socket.users');

io.on('connection', (socket) => {
    // when connect
    console.log('user connected : ', socket.id);

    socket.on('addUser', (userId) => {
        addUser(userId, socket.id);
        io.emit('getUsers', listOfUsers());
    });

    //send and get message
    socket.on('sendMessage', ({ senderId, receiverId, message }) => {
        const user = getUser(receiverId);
        io.to(user.socketId).emit('getMessage', {
            senderId,
            message,
        });
    });

    // when disconnect
    socket.on('disconnect', () => {
        console.log('user disconnected : ', socket.id);
        removeUser(socket.id);
        io.emit('getUsers', listOfUsers());
    });
});

server.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
