import styled from "styled-components";
import { MessageInput } from "../components/MessageInput";
import { useSocket } from "../context/SocketContext";

export function ChatRoom() {
  const { room, messages } = useSocket();

  return (
    <>
      <header>
        <h1>You are in room: {room}</h1>
      </header>
      <main>
        <ul>
          {messages.map((message, i) => (
            <MessageWrapper key={i}>
              <SenderName>{message.name} said:</SenderName>
              <Message> {message.message}</Message>
            </MessageWrapper>
          ))}
        </ul>

        <MessageInput />
      </main>
    </>
  );
}

const MessageWrapper = styled.div`

`;

const SenderName = styled.div`
  padding: 0.5rem;
`;

const Message = styled.div`
  display: inline-block;
  background-color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
`;
