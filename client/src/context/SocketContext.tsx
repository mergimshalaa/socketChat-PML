import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { io } from "socket.io-client";
import { Message } from "../../../server/apitypes";

interface ContextValues {
  room?: string;
  joinRoom: (room: string, name: string) => void;
  leaveRoom: (room: string) => void;
  sendMessage: (message: string) => void;
  messages: Message[];
  roomList: string[];
}

const socket = io();
const SocketContext = createContext<ContextValues>(
  null as any
);
export const useSocket = () => useContext(SocketContext);

export function SocketProvider({
  children,
}: PropsWithChildren) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [room, setRoom] = useState<string>("");
  const [roomList, setRoomList] = useState<string[]>([]);

  const joinRoom = (room: string, name: string) => {
    socket.emit("join", room, name, () => {
      setRoom(room);
      console.log(`User ${name} joined room: ${room}`);
    });
  };

  const leaveRoom = (room: string) => {
    socket.emit('leave', room, () => {
      if (room.length > 0) {
        return
      }
    })
  }

  const sendMessage = (message: string) => {
    if (!room)
      return console.log(
        "Must enter a room to send message!"
      );
    socket.emit("message", room, message);
  };

  useEffect(() => {
    function connect() {
      console.log("connected to server");
    }
    function disconnect() {
      console.log("disconnected from server");
    }
    function message(name: string, message: string) {
      setMessages((messages) => [
        ...messages,
        { name, message },
      ]);
    }
    function rooms(rooms: string[]) {
      console.log(rooms);
      setRoomList(rooms);
    }

    socket.on("connect", connect);
    socket.on("disconnect", disconnect);
    socket.on("message", message);
    socket.on("rooms", rooms);

    return () => {
      socket.off("connect", connect);
      socket.off("disconnect", disconnect);
      socket.off("message", message);
      socket.off("rooms", rooms);
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        room,
        joinRoom,
        leaveRoom,
        sendMessage,
        messages,
        roomList,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}
