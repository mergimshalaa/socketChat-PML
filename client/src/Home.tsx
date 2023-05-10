import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSocket } from "./context/SocketContext";

const Home = () => {
  const [room, setRoom] = useState("");
  const { joinRoom } = useSocket();
  const { setUsername } = useSocket();

  const navigate = useNavigate();

  const handleJoinRoom = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    joinRoom(room);
    navigate("/chat");
  };

  const handleUsernameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUsername(e.target.value);
  };

  return (
    <HomeContainer onSubmit={handleJoinRoom}>
      <Input
        name="Name"
        placeholder="Type your username..."
        type="text"
        onChange={handleUsernameChange}
      />

      <Input
        name="Room"
        placeholder="Room"
        type="text"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      <Button type="submit">Join</Button>
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.form`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 30rem;
`;

const Input = styled.input`
  padding: 15px 5px 10px 20px;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  background-color: white;
  margin-bottom: 16px;
  width: 80%;
  max-width: 400px;
  z-index: 100;
  background: none;
  color: #555;
  box-shadow: inset 8px 8px 8px #cbced1,
              inset -8px -8px 8px #ffffff;
  border: none;
  outline: none;
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
