import { useState, useEffect } from "react";
import styled from "styled-components";
import { useSocket } from "./context/SocketContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const { joinRoom } = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    // Kolla om användaren redan är inloggad
    // Om så är fallet, navigera direkt till chatten
    const loggedInUser = localStorage.getItem("username");
    const loggedInRoom = localStorage.getItem("room");
    if (loggedInUser && loggedInRoom) {
      setRoom(loggedInRoom);
      setUsername(loggedInUser);
      joinRoom(loggedInRoom, loggedInUser);
      navigate("/chat");
    }
  }, []);

  const handleJoinRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    joinRoom(room, username);
    localStorage.setItem("username", username);
    localStorage.setItem("room", room);
    navigate("/chat");
  };

  return (
    <HomeContainer onSubmit={handleJoinRoom}>
      <Input
        name="Name"
        placeholder="Type your username..."
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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