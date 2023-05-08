import { Server } from 'socket.io';
import type { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from './apitypes';
import fs from 'fs';
import path from 'path';

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>();

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`)

  socket.on('message', (room: string, message: string) => {
    const name = socket.data.name!;
    const timestamp = Date.now();
    const data = { name, message, timestamp };
    const filepath = path.join(__dirname, 'messages', `${room}.json`);
    try {
      const messages = fs.existsSync(filepath)
        ? JSON.parse(fs.readFileSync(filepath, 'utf-8'))
        : [];
      messages.push(data);
      fs.writeFileSync(filepath, JSON.stringify(messages));
      io.to(room).emit('message', data, message);
      console.log(room, name, message);
    } catch (error) {
      console.error(`Error while writing to file: ${error}`);
    }
  })

  socket.on('join', (room: string, name: string, ack) => {
    socket.data.name = name;
    socket.join(room);
    ack();
    io.emit('rooms', getRooms());
  });

  socket.emit('rooms', getRooms());
});

function getRooms() {
  const { rooms } = io.sockets.adapter;
  const roomList: string[] = [];
  for (const [name, setOfSocketids] of rooms) {
    if (!setOfSocketids.has(name)) {
      roomList.push(name);
    }
  }
  return roomList
}

io.listen(3000);
console.log('Listening on port 3000');
