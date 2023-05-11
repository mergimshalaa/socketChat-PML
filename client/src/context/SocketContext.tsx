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
  setRoomList: React.Dispatch<
    React.SetStateAction<string[]>
  >;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  joinDM: (personBeingContacted: string) => void;
}

const socket: Socket<
  ServerToClientEvents,
  ClientToServerEvents
> = io();

const SocketContext = createContext<ContextValues>(null as any);

export const useSocket = () => useContext(SocketContext);

export function SocketProvider({
  children,
}: PropsWithChildren) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentRoom, setCurrentRoom] = useState("");
  const [room, setRoom] = useState<string>("");
  const [roomList, setRoomList] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [usersTyping, setUsersTyping] = useState<string[]>(
    []
  );
  const [username, setUsername] = useState("");

  const joinRoom = (room: string) => {
    socket.emit("join", room, username, () => {
      setCurrentRoom(room);
      setRoom(room);
      console.log(`User ${username} joined room: ${room}`);
    });
  };

  const joinDM = (personBeingContacted: string) => {
    socket.emit("joinDM", personBeingContacted, username, );
  };

  const leaveRoom = () => {
    socket.emit("leave", currentRoom, () => {
      setCurrentRoom("");
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
      setRoomList(rooms);
    }

    function onStartType(username: string) {
      setUsersTyping([...usersTyping, username]);
    }

    function onStopType(username: string) {
      setUsersTyping(
        usersTyping.filter(
          (username) => username === username
        )
      );
    }

    socket.on("connect", connect);
    socket.on("disconnect", disconnect);
    socket.on("message", message);
    socket.on("rooms", rooms);
    socket.on("startType", onStartType);
    socket.on("stopType", onStopType);
    // listen for the joinDMWithPerson event and automatically join the room
    socket.on('joinDMWithPerson', (personBeingContacted: string) => {
      const roomName = `${personBeingContacted}:${username}`;
      socket.emit('joinRoom', roomName, personBeingContacted);
      // emit an event to notify the participants in the room that a new user has joined
    });    
    
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
    joinDM,
  };

  return (
    <SocketContext.Provider value={values}>
      {children}
    </SocketContext.Provider>
  );
}
