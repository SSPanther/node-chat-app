const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const {generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '/../public') ;
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

// Middleware
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    //console.log('RoomList:', users.getRoomList());
    socket.emit('updateRoomList', users.getRoomList());

    // User joins
    socket.on('join', (params, callback) => {

        //console.log(`Room: ${params.room}`);
        //console.log(`Existing room: ${params.existingRoom}`);

        var selectedRoom = (params.existingRoom !== 'None') ? params.existingRoom : params.room;

        socket.emit('updateRoomList', users.getRoomList());

        if (!isRealString(params.name) || !isRealString(selectedRoom)) {
            return callback('Name and room name are required.')
        }

        if (users.getUserByName(params.name)) {
            return callback('Name already exists in chat');
        }

        socket.join(selectedRoom);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, selectedRoom);

        io.to(selectedRoom).emit('updateUserList', users.getUserList(selectedRoom));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat app'));
        socket.broadcast.to(selectedRoom).emit('newMessage', generateMessage('Admin',`${params.name} has joined`));

        callback();
    });

    socket.on('createMessage', (msg, callback) => {
        var user = users.getUser(socket.id);

        if (user && isRealString(msg.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, msg.text));
        }

        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);

        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });

    // User leaves
    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }
    });
})

server.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};