import { useSocket } from "../context/SocketContext";

export function RoomList() {
  const { roomList } = useSocket();

  return (
    <>
      {roomList.map((roomName) => (
        <div>{roomName}</div>
      ))}
    </>
  );
}
