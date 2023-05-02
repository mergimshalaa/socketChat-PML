import { Server } from 'socket.io';
import type { ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData } from './apitypes';

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>();

io.on('connection', (socket) => {
    console.log('user connected')
})

io.listen(3000);
console.log('Listening on port 3000');