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

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleButtonClick = () => {
    // handle button click, for example navigate to chatrooms page
  };

  return (
    <HomeContainer>
      <Input
        type="text"
        placeholder="Enter your username..."
        value={username}
        onChange={handleInputChange}
      />
      <Button onClick={handleButtonClick}>Enter Chatrooms</Button>
    </HomeContainer>
  );
};

export default Home;
