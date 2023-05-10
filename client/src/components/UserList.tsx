import styled from "styled-components";
import { useSocket } from "../context/SocketContext";
import { useEffect } from "react";

export function RoomList() {
  const { Otherusers, leaveRoom, joinRoom } = useSocket();

  function handleJoinDirectMessages(roomName: string) {
    leaveRoom();
    joinRoom(roomName);
  }

 

  return (
    <Wrapper>
      <RoomTitle>Active rooms:</RoomTitle>
      <RoomListDiv>
        {Otherusers.map((username) => (
          <ListedRoom
            key={username}
            id={username}
            onClick={() => handleJoinDirectMessages(username)}
          >
            {username}
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
  padding: .3rem;
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