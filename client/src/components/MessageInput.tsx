import React, { useState } from "react";
import styled from "styled-components";

type Props = {
  onSend: (message: string) => void;
};

export const MessageInput: React.FC<Props> = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message) return;
    onSend(message);
    setMessage("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <MessageInputWrapper>
        <MessageInputField
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={handleChange}
        />
        <MessageSendButton type="submit">Send</MessageSendButton>
      </MessageInputWrapper>
    </form>
  );
};

const MessageInputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const MessageInputField = styled.input`
  flex-grow: 1;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: none;
  margin-right: 0.5rem;
`;

const MessageSendButton = styled.button`
  background-color: white;
  color: black;
  border-radius: 0.5rem;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;
