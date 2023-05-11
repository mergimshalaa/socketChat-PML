import styled from "styled-components";
import { useConntectedContext } from "../context/UserContext";
import { useSocket } from "../context/SocketContext";

export function UserList() {
  const { connectedUsers } = useConntectedContext();
  const { joinDM } = useSocket()

  function handleJoinDirectMessages(user: User) {
    const personBeingContacted = user.name

    joinDM(personBeingContacted)
  }

  type User = {
    id: string;
    name: string;
  };

  return (
    <Wrapper>
      <RoomTitle>Active users:</RoomTitle>
      <UList>
        <UserListTitle>Connected users:</UserListTitle>
        {connectedUsers.map((user: User) => (
          <ListedUser onClick={() => handleJoinDirectMessages(user)} key={user.id}>
            {user.name}
          </ListedUser>
        ))}
      </UList>
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

const UList = styled.div`
  margin-top: 1rem;
`;

const UserListTitle = styled.h3`
  margin-left: 1rem;
`;

const ListedUser = styled.div`
  padding: 0.2rem;
  margin: 0.5rem 0;
`;


