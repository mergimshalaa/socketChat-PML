import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Socket, io } from "socket.io-client";
import {
  ClientToServerEvents,
  Message,
  ServerToClientEvents,
} from "../../../server/apitypes";

interface ContextValues {
  room?: string;
  joinRoom: (room: string, name: string) => void;
  leaveRoom: (room: string) => void;
  sendMessage: (message: string) => void;
  messages: Message[];
  roomList: string[];
  startType: (room: string) => void;
  stopType: (room: string) => void;
  usersTyping: string[];
  setRoomList: React.Dispatch<React.SetStateAction<string[]>>
}

const socket: Socket<
  ServerToClientEvents,
  ClientToServerEvents
> = io();
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
  const [isTyping, setIsTyping] = useState(false);
  const [usersTyping, setUsersTyping] = useState<string[]>(
    []
  );

  const joinRoom = (room: string, name: string) => {
    socket.emit("join", room, name, () => {
      setRoom(room);
      console.log(`User ${name} joined room: ${room}`);
    });
  };

  const leaveRoom = (room: string) => {
    socket.emit("leave", room, () => {
      setRoom("");
    });
  };

  const sendMessage = (message: string) => {
    if (!room)
      return console.log(
        "Must enter a room to send message!"
      );
    socket.emit("message", room, message);
  };

  const startType = (room: string) => {
    if (!isTyping) {
      socket.emit("startType", room);
      setIsTyping(true);
    }
  };
  
  const stopType = (room: string) => {
    socket.emit("stopType", room);
    setIsTyping(false);
  }

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
      setRoomList(rooms);
    }

    function onStartType(username: string) {
      debugger
      const clone = structuredClone(usersTyping)
      clone.push(username)
      console.log(username)
      setUsersTyping(clone)
    }

    function onStopType(username: string) {
      setUsersTyping(usersTyping.filter(username => username === username))
    }

    socket.on("connect", connect);
    socket.on("disconnect", disconnect);
    socket.on("message", message);
    socket.on("rooms", rooms);
    socket.on("startType", onStartType);
    socket.on("stopType", onStopType);
    
    return () => {
      socket.off("connect", connect);
      socket.off("disconnect", disconnect);
      socket.off("message", message);
      socket.off("rooms", rooms);
      socket.off("startType", onStartType);
      socket.off("stopType", onStopType);
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
        startType,
        stopType,
        usersTyping,
        setRoomList,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}
