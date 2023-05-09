export interface ServerToClientEvents {
  message: (name: string, message: string) => void;
  rooms: (rooms: string[]) => void;
  startType: (username: string) => void;
  stopType: (username: string) => void;
}

export interface ClientToServerEvents {
  message: (room: string, message: string) => void;
  join: (
    room: string,
    name: string,
    ack: () => void
  ) => void;
  leave: (room: string, ack: () => void) => void;
  startType: (room: string) => void;
  stopType: (room: string) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
}

export interface Message {
  name: string;
  message: string;
}
