import React, { ReactNode, useState } from 'react';

type User = {
  id: string;
  name: string;
};

type ConnectedUsersContextType = {
  connectedUsers: User[];
  addUser: (user: User) => void;
  removeUser: (userId: string) => void;
};

export const ConnectedUsersContext = React.createContext<ConnectedUsersContextType>({
  connectedUsers: [],
  addUser: () => {},
  removeUser: () => {},
});

export function ConnectedUsersProvider({ children }: { children: ReactNode }) {
  const [connectedUsers, setConnectedUsers] = useState<User[]>([]);

  function addUser(user: User) {
    setConnectedUsers((prevUsers) => [...prevUsers, user]);
  }

  function removeUser(userId: string) {
    setConnectedUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  }

  const contextValues = {
    connectedUsers,
    addUser,
    removeUser,
  };

  return <ConnectedUsersContext.Provider value={contextValues}>{children}</ConnectedUsersContext.Provider>;
}
