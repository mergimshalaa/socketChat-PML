import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MessageInput } from "../components/MessageInput";
import { useSocket } from "../context/SocketContext";

export function ChatRoom() {
  const {
    room,
    messages,
    leaveRoom,
    usersTyping,
    setRoomList,
    roomList,
  } = useSocket();
  console.log(usersTyping);
  const navigate = useNavigate();

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
            <h1>You are in room: {room}</h1>
            <LeaveButton onClick={handleLeaveRoom}>
              Leave room
            </LeaveButton>
          </HeaderWrapper>
        </StyledHeader>
        <StyledMain>
          <ul
            style={{ height: "25rem", overflow: "scroll" }}
          >
            {messages.map((message, i) => (
              <MessageWrapper key={i}>
                <SenderName>
                  {message.name} said:
                </SenderName>
                <Message> {message.message}</Message>
              </MessageWrapper>
            ))}
          </ul>

          {usersTyping.length > 0 &&
            `${usersTyping} is typing...`}
          <MessageInput />
        </StyledMain>
      </div>
    </>
  );
}

const MessageWrapper = styled.div`
  margin 0 1rem;
`;

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
  margin-left: 5%;
  height: 100%;
`;

const StyledHeader = styled.header`
  margin-left: 5%;
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
  &:hover {
    background-color: #f13;
    cursor: pointer;
    transform: scale(1.05);
  }
`;
