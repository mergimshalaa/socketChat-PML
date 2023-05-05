import { ChangeEvent, useState } from "react";
import { useState } from "react";
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

const Home = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState('');


  const joinRoom = (e: React.FormEvent<HTMLFormElement>) => {
    //Handle the onSubmit for joinRoom.
    e.preventDefault();

  };

  return (
    <form onSubmit={joinRoom}>
      <Input
        name='Name'
        placeholder='Type your username...'
        type='text'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        // Sets username to the value inside the input
      />

      <Input
        name='Room'
        placeholder='Room'
        type='text'
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        //Takes a value to name the room the user wants to join
      />
        <Button type='submit'>Join</Button>
    </form>
  );
};

export default Home;
