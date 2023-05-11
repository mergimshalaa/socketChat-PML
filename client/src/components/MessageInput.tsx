import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";
import { useSocket } from "../context/SocketContext";

export function MessageInput() {
  const [message, setMessage] = useState("");
  const { sendMessage, startType, stopType, room } = useSocket();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage("");
      stopType(room || "");
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value) {
      startType(room || "");
    } else {
      stopType(room || "");
    }
    setMessage(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ width: '100%', display: 'flex', padding: '1rem' }}>
      <Input
        type="text"
        name="name"
        placeholder="Message..."
        value={message}
        onChange={handleMessageChange}
      />
      <Button type="submit" disabled={!message.trim()}>
        <FontAwesomeIcon icon={faPaperPlane} />
      </Button>
      </div>
    </form>
  );
}

const Input = styled.input`
  padding: .5rem 1rem;
  border-radius: 0.3rem;
  border: none;
  flex: 1;
  border: none;
  outline: none;
`;

const Button = styled.button`
  border: none;
  padding: 0.5rem;
  border-radius: 0.3rem;
  background-color: #2192ff;
  color: #fff;
`;
