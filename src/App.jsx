import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import TestScreen from './components/TestScreen';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/test" element={<TestScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
