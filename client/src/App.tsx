import Home from './Home';
import { ChatRoom } from './components/ChatRoom';
import { useSocket } from './context/SocketContext';

function App() {
  const { room } = useSocket()
  return (
     <>
      { room ? <ChatRoom /> : <Home /> }
    </>
  );
}

export default App;