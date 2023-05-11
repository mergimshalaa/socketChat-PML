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
  });
  
  socket.on("join", (room: string, name: string, ack) => {
    // Kolla så att användaren inte försöker joina ett DM-rum som inte är deras
    socket.data.name = name;
    socket.join(room);
    ack();
    io.emit("rooms", getRooms());
  });
  
  socket.on('leave', (room: string, ack: () => void) => {
    socket.leave(room)
    io.to(room).emit("message", socket.data.name!, 'left the room');
    ack();
    io.emit("rooms", getRooms());
  })

  socket.on('startType', (room: string) => {
    socket.broadcast.to(room).emit('startType', socket.data.name!)
  })

  socket.on('stopType', (room: string) => {
    socket.broadcast.to(room).emit('stopType', socket.data.name!)
  })
  
  socket.emit("rooms", getRooms());

  // server.js

  socket.on('joinDM', (personBeingContacted: string, username: string) => {
    const roomName = `DM:${personBeingContacted}:${socket.data.name}`;
    socket.join(roomName);
    // emit an event to notify the participants in the room that a new user has joined
    io.to(roomName).emit('userJoined', username);

    // check if the personBeingContacted is already in the room
    const isPersonBeingContactedInRoom = io.sockets.adapter.rooms.get(roomName)?.has(personBeingContacted);

    // if the personBeingContacted is not already in the room, add them to the room
    if (!isPersonBeingContactedInRoom) {
      // emit a special event to the personBeingContacted's socket to automatically join the room
      io.to(personBeingContacted).emit('joinDMWithPerson', username);
    }
  });

  socket.on('joinRoom', (roomName, personBeingContacted) => {
    const username = personBeingContacted;
    socket.join(roomName);
    socket.to(roomName).emit('userJoined', username);
  });
});


function getRooms() {
  const { rooms } = io.sockets.adapter;
  const roomList: string[] = [];

  for (const [name, setOfSocketids] of rooms) {
    if (!setOfSocketids.has(name)) {
      roomList.push(name);
    }
  }
  return roomList;
}

io.listen(3000);
console.log("Listening on port 3000");
