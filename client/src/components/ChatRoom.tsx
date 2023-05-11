import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MessageInput } from "../components/MessageInput";
import { useSocket } from "../context/SocketContext";
import { useEffect, useRef } from "react";
import { UserList } from "./UserList";
import { RoomList } from "./RoomList";

export function ChatRoom() {
  const { room, messages, leaveRoom, usersTyping, setRoomList, roomList } =
    useSocket();

  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current !== null) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(scrollToBottom, [messages]);

  const handleLeaveRoom = () => {
    if (!room) return;
    leaveRoom();
    setRoomList(roomList);
    navigate("/");
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: "1",
        }}
      >
        <StyledHeader>
          <HeaderWrapper>
            <Header>You are in room: {room}</Header>
            <LeaveButton onClick={handleLeaveRoom}>Leave room</LeaveButton>
          </HeaderWrapper>
        </StyledHeader>
        <StyledAside>
          <UserList></UserList>
          <RoomList></RoomList>
        </StyledAside>
        <StyledMain>
          <ul style={{ height: "25rem", overflow: "scroll" }}>
            {messages.map((message, i) => (
              <MessageWrapper key={i}>
                <SenderName>{message.name} said:</SenderName>
                <Message> {message.message}</Message>
              </MessageWrapper>
            ))}
            <div ref={messagesEndRef} />
          </ul>

          {usersTyping.length > 0 && `${usersTyping} is typing...`}
          <MessageInput />
        </StyledMain>
      </div>
    </>
  );
}


const StyledAside = styled.aside`
  margin: 0 1rem;
`;

const MessageWrapper = styled.div`
  margin: 0 1rem;
`;

const SenderName = styled.div`
  font-weight: bold;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Message = styled.div`
  display: inline-block;
  background-color: lightgreen;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  box-shadow: -8px -8px 16px rgba(255, 255, 255, 0.75),
    8px 8px 16px rgba(0, 0, 0, 0.15);
  margin-right: 1rem;
`;

const StyledMain = styled.main`
  background-color: #fff;
  margin-left: 5%;
  height: 100%;
  border-radius: 10px;
  box-shadow: -8px -8px 16px rgba(255, 255, 255, 0.75),
    8px 8px 16px rgba(0, 0, 0, 0.15);
`;

const StyledHeader = styled.header`
  margin-left: 5%;
  margin-bottom: 1rem;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeaveButton = styled.button`
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: none;
  background-color: #f45;
  color: #fff;
  box-shadow: -4px -4px 8px rgba(255, 255, 255, 0.75),
    4px 4px 8px rgba(0, 0, 0, 0.15);
  &:hover {
    background-color: #f13;
    cursor: pointer;
    transform: scale(1.05);
  }
`;

const Header = styled.h1`
  color: #000;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0.5rem 0;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2),
    -2px -2px 4px rgba(255, 255, 255, 0.2);
`;
