import styled from "styled-components";
import { useSocket } from "../context/SocketContext";

export function RoomList() {
  const { roomList } = useSocket();

  return (
    <>
      <Wrapper>
        <RoomTitle>Active rooms:</RoomTitle>
        <RoomListDiv>
          {roomList.map((roomName) => (
            <ListedRoom key={roomName}>{roomName}</ListedRoom>
          ))}
        </RoomListDiv>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 200px;
  display: inline-block;
`;

const RoomTitle = styled.h3`
    margin-left: 1rem;
`;

const RoomListDiv = styled.div`
    border-radius: 1rem;
    background-color: #FFF;
    padding: .5rem 1rem;;
    `;
    
    const ListedRoom = styled.div`
    border-bottom: 1px solid lightgray;
    padding: .2rem;
    margin: .5rem 0;
`;
