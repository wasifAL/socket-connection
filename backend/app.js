var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
app.get('/', (req, res) => res.send('hello!'));
http.listen(3000, () => {
    console.log('listening on *:3000');
});

io.on('connection', (socket) => {
    console.log(socket.rooms);
    socket.on('join', (room) => {
        console.log(room)
        socket.join(room);
        socket.in(room).on('send', (data) => {
            console.log("room specific send : " + JSON.stringify(data));
            socket.in(room).broadcast.emit('broadcast', data.msg);
        });
    });

});

