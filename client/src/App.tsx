import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import { ChatRoom } from "./components/ChatRoom";
import { RoomList } from "./components/RoomList";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<><RoomList /><ChatRoom /></>} />

         {/* {room ? <ChatRoom /> : <Home />} */}
      </Routes>
    </>
  );
}

export default App;
