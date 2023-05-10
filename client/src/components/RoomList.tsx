import styled from "styled-components";
import { useSocket } from "../context/SocketContext";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export function RoomList() {
  const { roomList, leaveRoom, joinRoom } = useSocket();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  function handleJoinRoom(roomName: string) {
    leaveRoom();
    joinRoom(roomName);
    setIsSidebarOpen(false);
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
  margin-left: 1rem;
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
  margin: 0.5rem 0;
  cursor: pointer;
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
  font-size: 1.5rem;
  &:focus {
    outline: none;
  }
`;
