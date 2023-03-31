const io = require('socket.io')(3001, {
    cors: {
        origin: '*',
    }
});


io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('message', (message) => {
        console.log('received message:', message);
        io.emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
