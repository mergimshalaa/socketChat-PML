import { Server } from 'socket.io';
import type { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from './apitypes';

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>();

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`)

    socket.on('join', (room, name, ack) => {
        socket.data.name = name;
        socket.join(room);
        console.log(socket.rooms);
        ack();
    });
})

io.listen(3000);
console.log('Listening on port 3000');