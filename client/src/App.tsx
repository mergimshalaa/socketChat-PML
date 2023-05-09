import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import { ChatRoom } from "./components/ChatRoom";
import { RoomList } from "./components/RoomList";

function App() {
  return (
    <>
      <div style={{ display: "flex" }}>
        <RoomList />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<ChatRoom />} />

          {/* {room ? <ChatRoom /> : <Home />} */}
        </Routes>
      </div>
    </>
  );
}

export default App;
