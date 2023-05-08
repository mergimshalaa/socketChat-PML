import styled from "styled-components";
import { MessageInput } from "../components/MessageInput";
import { useSocket } from "../context/SocketContext";

export function ChatRoom() {
  const { room, messages, leaveRoom } = useSocket();

  const handleLeaveRoom = (room: string) => {
    leaveRoom(room);
  };

  return (
    <>
      <StyledHeader>
        <HeaderWrapper>
          <h1>You are in room: {room}</h1>
          <LeaveButton onClick={handleLeaveRoom}>Leave room</LeaveButton>
        </HeaderWrapper>
      </StyledHeader>
      <StyledMain>
        <ul>
          {messages.map((message, i) => (
            <MessageWrapper key={i}>
              <SenderName>{message.name} said:</SenderName>
              <Message> {message.message}</Message>
            </MessageWrapper>
          ))}
        </ul>

        <MessageInput />
      </StyledMain>
    </>
  );
}

const MessageWrapper = styled.div``;

const SenderName = styled.div`
  padding: 0.5rem;
`;

const Message = styled.div`
  display: inline-block;
  background-color: lightgreen;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
`;

const StyledMain = styled.main`
  background-color: #fff;
  margin-left: 20%;
  height: 100%;
`;

const StyledHeader = styled.header`
  margin-left: 20%;
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
`;
