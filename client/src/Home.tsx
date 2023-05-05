import { useState } from "react";
import styled from "styled-components";

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
`;

const Button = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  background-color: #7f9fff;
  color: white;
  cursor: pointer;
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
