import { useState } from "react";
import { useSocket } from "../context/SocketContext";

 export function MessageInput() {
     const [message, setMessage] = useState('')
     const { sendMessage } = useSocket();

     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendMessage(message);
        setMessage('');
     }
    return (
        <>
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Message..." value={message} onChange={(e) => setMessage(e.target.value)}/>
            <button type="submit">Send</button>
        </form>
        </>
    )
 } 