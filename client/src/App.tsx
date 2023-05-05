
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
// import Sidebar from './components/Sidebar'

function App() {
  return (
     <>
        {/* <Sidebar /> */}
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        {/* add more routes here */}
      </Routes>  
    </Router>
    </>
  );
}

export default App;