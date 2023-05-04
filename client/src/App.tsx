import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';

function App() {
  return (
    <Router>
        <Route path="/" element={<Home/>} />
        {/* add more routes here */}
    </Router>
  );
}

export default App;