import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Socket, io } from "socket.io-client";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../server/apitypes.ts";
import App from "./App.tsx";
import Background from "./background/Background.tsx";
import { SocketProvider } from "./context/SocketContext.tsx";
import "./index.css";

export const socket: Socket<
  ServerToClientEvents,
  ClientToServerEvents
> = io();

ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
).render(
  // <React.StrictMode>
  <BrowserRouter>
    <SocketProvider>
      <Background>
        <App />
      </Background>
    </SocketProvider>
  </BrowserRouter>
  // </React.StrictMode>,
);
