import { useEffect, useState } from "react";
import styled from "styled-components";
import { Message } from "../components/Message";
import { MessageInput } from "../components/MessageInput";
import { useSocket } from "../context/SocketContext";

export function ChatRoom() {
  const { room } = useSocket();
  const [messages, setMessages] = useState<string[]>([]);
  const username = localStorage.getItem("username") as string;

  // Fetch messages from JSON file when component mounts
  useEffect(() => {
    async function fetchMessages() {
      const response = await fetch(`${room}.json`);
      const data = await response.json();
      setMessages(data.messages);
    }
    fetchMessages();
  }, [room]);

  // Update messages state when a new message is sent
  function handleMessage(message: string) {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  const MessagesList = styled.ul`
  list-style-type: none;
  padding: 0;
`;


  return (
    <>
    <header>
      <h1>You are in room: {room}</h1>
    </header>
    <main>
      <MessagesList>
        {messages.map((message, i) => (
          <Message key={i} message={message} username={username} />
        ))}
      </MessagesList>

      <MessageInput onSend={handleMessage} />
    </main>
  </>
);
}
