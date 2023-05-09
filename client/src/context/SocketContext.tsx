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
  joinRoom: (room: string) => void;
  leaveRoom: () => void;
  sendMessage: (message: string) => void;
  messages: Message[];
  roomList: string[];
  startType: (room: string) => void;
  stopType: (room: string) => void;
  usersTyping: string[];
  setRoomList: React.Dispatch<React.SetStateAction<string[]>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();

const SocketContext = createContext<ContextValues>({
  joinRoom: () => {},
  leaveRoom: () => {},
  sendMessage: () => {},
  messages: [],
  roomList: [],
  startType: () => {},
  stopType: () => {},
  usersTyping: [],
  setRoomList: () => {},
  username: "",
  setUsername: () => {},
});

export const useSocket = () => useContext(SocketContext);

export function SocketProvider({ children }: PropsWithChildren) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentRoom, setCurrentRoom] = useState("");
  const [room, setRoom] = useState<string>("");
  const [roomList, setRoomList] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [usersTyping, setUsersTyping] = useState<string[]>([]);
  const [username, setUsername] = useState("");


  const joinRoom = (room: string) => {
    socket.emit("join", room, username, () => {
      setCurrentRoom(room);
      setRoom(room);
      console.log(`User ${username} joined room: ${room}`);
    });
  };

  const leaveRoom = () => {
    socket.emit("leave", currentRoom, () => {
      setCurrentRoom("");
      setRoom("");
    });
  };

  const sendMessage = (message: string) => {
    if (!room) return console.log("Must enter a room to send message!");
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
  };

  useEffect(() => {
    function connect() {
      console.log("connected to server");
    }
    function disconnect() {
      console.log("disconnected from server");
    }
    function message(name: string, message: string) {
      setMessages((messages) => [...messages, { name, message }]);
    }
    function rooms(rooms: string[]) {
      console.log(rooms);
      setRoomList(rooms);
    }

    function onStartType(username: string) {
      console.log(username);
      setUsersTyping([...usersTyping, username]);
    }

    function onStopType(username: string) {
      console.log(username);
      setUsersTyping(usersTyping.filter((username) => username === username));
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

  const values: ContextValues = {
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
    username,
    setUsername,
  };

  return (
    <SocketContext.Provider value={values}>{children}</SocketContext.Provider>
  );
}
