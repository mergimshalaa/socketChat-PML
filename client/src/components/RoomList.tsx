import styled from "styled-components";
import { useSocket } from "../context/SocketContext";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export function RoomList() {
  const { roomList, leaveRoom, joinRoom, username } = useSocket();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  function handleJoinRoom(roomName: string) {
    if (!username){
      return "Not allowed";
    }
    
    leaveRoom();
    joinRoom(roomName);
  }

  function handleSidebarToggle() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <>
      <Wrapper isSidebarOpen={isSidebarOpen}>
      <ToggleButton onClick={handleSidebarToggle}>
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </ToggleButton>
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
    </>
  );
}


const Wrapper = styled.div<{ isSidebarOpen: boolean }>`
  width: 200px;
  display: inline-block;
  background-color: #f5f5f5;
  padding: 0.3rem;
  border-radius: 1rem;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2),
    -4px -4px 8px rgba(255, 255, 255, 0.2);
  transform: ${(props) =>
    props.isSidebarOpen ? "translateX(0)" : "translateX(-100%)"};
  transition: transform 0.3s ease-in-out;
`;

const RoomTitle = styled.h3`
  margin-left: .6rem;
  color: #333;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2),
    -2px -2px 4px rgba(255, 255, 255, 0.2);
`;

const RoomListDiv = styled.div`
  margin-top: 1rem;
`;

const ListedRoom = styled.div`
  border-radius: 0.5rem;
  background-color: #fff;
  border-bottom: 2px solid lightgray;
  padding: 0.5rem 1rem;
  margin-left: .5rem;
  cursor: pointer;
  width: 8rem;
  &:hover {
    background-color: #aaa;
    color: #fff;
  }
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: .8rem;
  background-color: transparent;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;
