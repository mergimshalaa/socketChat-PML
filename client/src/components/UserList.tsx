import styled from "styled-components";
import { useSocket } from "../context/SocketContext";
import { useConntectedContext } from "../context/UserContext";

export function RoomList() {
  const { leaveRoom, joinRoom } = useSocket();
  const { connectedUsers } = useConntectedContext();

  function handleJoinDirectMessages(roomName: string) {
    leaveRoom();
    joinRoom(roomName);
  }

  type User = {
    id: string;
    name: string;
  };

  return (
    <Wrapper>
      <RoomTitle>Active users:</RoomTitle>
      <UserList>
        <UserListTitle>Connected users:</UserListTitle>
        {connectedUsers.map((user: User) => (
          <ListedUser onClick={() => handleJoinDirectMessages(user.name)} key={user.id}>
            {user.name}
          </ListedUser>
        ))}
      </UserList>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 200px;
  display: inline-block;
  background-color: #f5f5f5;
  padding: 0.3rem;
`;

const RoomTitle = styled.h3`
  margin-left: 1rem;
`;

const UserList = styled.div`
  margin-top: 1rem;
`;

const UserListTitle = styled.h3`
  margin-left: 1rem;
`;

const ListedUser = styled.div`
  padding: 0.2rem;
  margin: 0.5rem 0;
`;


