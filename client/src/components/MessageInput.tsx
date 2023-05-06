import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";
import { useSocket } from "../context/SocketContext";

export function MessageInput() {
  const [message, setMessage] = useState("");
  const { sendMessage } = useSocket();

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    sendMessage(message);
    setMessage("");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="Message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="submit">
          <FontAwesomeIcon icon={faPaperPlane} />
        </Button>
      </form>
    </>
  );
}

const Input = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 0.3rem;
  border: none;
  margin: 0.5rem;
  `;
  
  const Button = styled.button`
  border: none;
  padding: 0.5rem;
  border-radius: 0.3rem;
  background-color: #2192FF;
  color: #FFF;
`;
