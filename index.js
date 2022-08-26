const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { v4: uuidv4 } = require('uuid');
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
    debug: true
});

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.use('/peerjs', peerServer);
app.get('/', (req, res) => {
    res.redirect(`/${uuidv4()}`);
});

app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room })
})

io.on('connection', socket => { // socket is the connection
    socket.on('join-room', (roomId, userId) => { // join-room is the event name
        socket.join(roomId); // join the room
        socket.broadcast.to(roomId).emit('user-connected', userId);
        // socket.to(roomId).emit('user-connected', userId); // user-connected is the event name
    })
})

server.listen(8000, () => {
    console.log('Server started on port 3000');
});