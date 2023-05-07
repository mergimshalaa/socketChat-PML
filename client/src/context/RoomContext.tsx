import { ReactNode, createContext, useState } from "react";

interface ContextValues {
  room?: string;
  updateMessageHistory: (room: string, message: IMessage) => void;
  children: ReactNode;
}

//Update interface to match the values we use in server for a message.
interface IMessage {
  id: number;
  text: string;
  sender: string;
  createdAt: Date;
}

export const RoomContext = createContext<ContextValues>(null as any);

export const RoomProvider = ({ children }: ContextValues) => {
  const [messages, setMessages] = useState({});

  const updateMessageHistory = (room: string, message: IMessage) => {
    setMessages((prevMessages) => {
      // Add the new message to the chatroom's message history
      const updatedMessages = {
        ...prevMessages,
        [room]: [...(prevMessages[room] || []), message],
      };

      return updatedMessages;
    });
  };

  return (
    <RoomContext.Provider value={{ messages, updateMessageHistory }}>
      {children}
    </RoomContext.Provider>
  );
};

//Denna context ska wrappa runt vårt "lobby" element, lyssna efter "message" ping som vi gör när vi skickar nytt meddelande, och då rendera ut det nya meddelandet i realtid.
// OBS: Denna logiken går att lägga in i socket, context men det blir då rörigt att följa röda tråden enligt mig!
// OBS: Inte färdigt ännu, inte definierat prevMessages, gör imorgon
