import {MessageInput} from "../components/MessageInput";
import { useSocket } from "../context/SocketContext";


export function ChatRoom() {
    const { room, messages } = useSocket();
    
    return (
        <>
        <header>
            <h1>You are in room: {room}</h1>
        </header>
        <main>
            <ul>
                {messages.map((message, i) => (
                    <li key={i}>{message.name}: {message.message}</li>
                ))}
            </ul>

            <MessageInput />
        </main>
        </>
    )
}