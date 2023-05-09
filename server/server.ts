import { Server } from "socket.io";
import type {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "./apitypes";

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>();

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("message", (room: string, message: string) => {
    io.to(room).emit("message", socket.data.name!, message);
    console.log(room, socket.data.name, message);
  });
  
  socket.on("join", (room: string, name: string, ack) => {
    socket.data.name = name;
    socket.join(room);
    ack();
    io.emit("rooms", getRooms());
  });
  
  socket.on('leave', (room: string, ack: () => void) => {
    socket.leave(room)
    io.to(room).emit("message", socket.data.name!, 'left the room');
    ack();
  })

  socket.on('startType', () => {
    console.log(socket.data.name)
    socket.broadcast.emit('startType', socket.data.name!)
  })

  socket.on('stopType', () => {
    console.log(socket.data.name)
    socket.broadcast.emit('stopType', socket.data.name!)
  })
  
  socket.emit("rooms", getRooms());
});

function getRooms() {
  const { rooms } = io.sockets.adapter;
  const roomList: string[] = [];
  console.log(rooms);

  for (const [name, setOfSocketids] of rooms) {
    if (!setOfSocketids.has(name)) {
      roomList.push(name);
    }
  }
  return roomList;
}

io.listen(3000);
console.log("Listening on port 3000");
