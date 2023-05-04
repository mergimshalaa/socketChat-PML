import { Server } from 'socket.io';
import type { ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData } from './apitypes';

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>();

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`)

    socket.on('message', (message) => {
        socket.broadcast.emit('message', message)
    })
})

io.listen(3000);
console.log('Listening on port 3000');