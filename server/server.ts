import { Server } from 'socket.io';
import type { ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData } from './apitypes';

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>();

const rooms: string[] = []

io.on('connection', (socket) => {
    console.log('user connected')
    socket.on("userJoinRoom", (lobby) => {
        socket.join(lobby)
        rooms.push(lobby)
        //socket.emit("user_list", rooms)
    })
})

io.listen(3000);
console.log('Listening on port 3000');