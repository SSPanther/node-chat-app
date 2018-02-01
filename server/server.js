const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
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

    // socket.emit('newEmail', {
    //     from: 'mike@example.com',
    //     text: 'Hey. What is going on.',
    //     createdAt: 123
    // });

    // socket.on('createEmail', (newEmail) => {
    //     console.log('createEmail', newEmail);
    // });

    socket.on('createMessage', (msg, callback) => {
        console.log('createMessage:', msg);
        io.emit('newMessage', generateMessage(msg.from, msg.text));
        callback('This is from the server.');
        // socket.broadcast.emit('newMessage', {
        //     from: msg.from,
        //     text: msg.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
})

server.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};