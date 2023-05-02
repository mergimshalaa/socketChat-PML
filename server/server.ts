import { Server } from 'socket.io';

const io = new Server();

io.on('connection', (socket) => {
    console.log('user connected')
})

io.listen(3000);
console.log('Listening on port 3000');