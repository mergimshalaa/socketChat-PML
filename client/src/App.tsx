import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import { ChatRoom } from "./components/ChatRoom";

function App() {
  return (
    <>
      <div style={{ display: "flex" }}>
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
