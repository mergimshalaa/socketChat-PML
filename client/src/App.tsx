import Home from './Home';
import { useSocket } from './context/SocketContext';
// import Sidebar from './components/Sidebar'

function App() {
  const { room } = useSocket()
  return (
     <>
      { room ? <h1>Welcome to Lobby</h1> : <Home /> }
    </>
  );
}

export default App;