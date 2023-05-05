import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

interface ContextValues {
  socket: Socket;
  room?: string;
  joinRoom: (room: string, name: string) => void; 
}

const socket = io();
const SocketContext = createContext<ContextValues>(null as any);
export const useSocket = () => useContext(SocketContext);

export function SocketProvider({ children }: PropsWithChildren) {
  // const [socket] = useState<Socket<ServerToClientEvents, ClientToServerEvents>>(
  //   io()
  // );
  const [room, setRoom] = useState<string>();
  const joinRoom = (room: string, name: string) => {
    socket.emit('join', room, name, () => {
        setRoom(room);
    })
  }

  useEffect(() => {
    function connect() {
        console.log('connected to server')  
    }
    function disconnect() {
        console.log('disconnected from server')  
    }
    function message(message:string) {
        console.log(message)  
    }
    
    // socket.on("user_list", (rooms) => {
    //   setRooms(rooms)
    // })  

    socket.on('connect', connect);
    socket.on('disconnect', disconnect);
    socket.on('message', message)
    return()=> {
        socket.off('connect', connect)
        socket.off('disconnect', disconnect)
        socket.off('message', message)
    }
  },[]);

  return (
    <SocketContext.Provider value={{ socket, room, joinRoom }}>
      {children}
    </SocketContext.Provider>
  );
}