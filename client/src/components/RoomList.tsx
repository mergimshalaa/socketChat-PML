import styled from "styled-components";
import { useSocket } from "../context/SocketContext";

export function RoomList() {
  const { roomList } = useSocket();

  const handleSwitchRoom = () => {
    return
  }

  return (
    <>
      <Wrapper>
        <RoomTitle>Active rooms:</RoomTitle>
        <RoomListDiv>
          {roomList.map((roomName) => (
            <ListedRoom key={roomName} onClick={handleSwitchRoom}>
              {roomName}
            </ListedRoom>
          ))}
        </RoomListDiv>
      </Wrapper>
    </>
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
  border-bottom: 1px solid lightgray;
  border-radius: 0.3rem;
  background-color: #FFF;
  padding: 0.5rem 1rem;
  margin: 0.5rem 0;
  &:hover {
    background-color: #AAA;
    color: #FFF
  }
`;
