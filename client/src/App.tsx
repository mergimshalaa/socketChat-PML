import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        {/* add more routes here */}
      </Routes>  
    </Router>
  );
}

export default App;