import React from 'react';
import ReactDOM from 'react-dom/client';
import { Socket, io } from 'socket.io-client';
import App from './App.tsx';
import './index.css';
import type { ServerToClientEvents, ClientToServerEvents } from '../../server/apitypes.ts'

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
