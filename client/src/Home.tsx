import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { useSocket } from "./context/SocketContext";

const Home = () => {
  const [username, setUsername] = useState("");

  const {joinLobby} = useSocket();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  return (
    <HomeContainer>
      <Input
        type="text"
        placeholder="Enter your username..."
        value={username}
        onChange={handleInputChange}
      />
      <Button onClick={joinLobby}>Enter Chatrooms</Button>
    </HomeContainer>
  );
};


const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Input = styled.input`
  padding: 12px 16px;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  background-color: white;
  margin-bottom: 16px;
  width: 80%;
  max-width: 400px;
  z-index: 100;
`;

const Button = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  background-color: #7f9fff;
  color: white;
  cursor: pointer;
  z-index: 100;
`;

export default Home;
