const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '/../public') ;
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

// Middleware
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    // socket.emit from Admin text Welcome to the chat app
    // socket.broadcast.emit from Admin text New user joined
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            callback('Name and room name are required.')
        }

        callback();
    });

    socket.on('createMessage', (msg, callback) => {
        console.log('createMessage:', msg);
        io.emit('newMessage', generateMessage(msg.from, msg.text));
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
})

server.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};