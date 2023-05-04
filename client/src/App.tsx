
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
// import Sidebar from './components/Sidebar'

function App() {
  return (
     <>
        {/* <Sidebar /> */}
    <Router>
        <Route path="/" element={<Home/>} />
        {/* add more routes here */}
    </Router>
    </>
  );
}

export default App;