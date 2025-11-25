import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MatchDetail from './pages/MatchDetail';
import Admin from './pages/Admin';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/match/:id" element={<MatchDetail />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


