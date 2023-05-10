import styled from "styled-components";
import { useSocket } from "../context/SocketContext";

export function RoomList() {
  const { roomList, leaveRoom, joinRoom } = useSocket();

  function handleJoinRoom(roomName: string) {
    leaveRoom();
    joinRoom(roomName);
  }

  return (
    <Wrapper>
      <RoomTitle>Active rooms:</RoomTitle>
      <RoomListDiv>
        {roomList.map((roomName) => (
          <ListedRoom
            key={roomName}
            id={roomName}
            onClick={() => handleJoinRoom(roomName)}
          >
            {roomName}
          </ListedRoom>
        ))}
      </RoomListDiv>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 200px;
  display: inline-block;
  background-color: #f5f5f5;
  padding: 0.3rem;
`;

const RoomTitle = styled.h3`
  margin-left: 1rem;
`;

const RoomListDiv = styled.div``;

const ListedRoom = styled.div`
  border-radius: 0.5rem;
  background-color: #fff;
  border-bottom: 2px solid lightgray;
  padding: 0.5rem 1rem;
  margin: 0.5rem 0;
  cursor: pointer;
  &:hover {
    background-color: #aaa;
    color: #fff;
  }
`;
