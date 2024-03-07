import './App.css';
import Artwork from './Pages/Artwork/artwork';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArtworkDetails from './Pages/ArtworkDetails/artworkDetails';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Artwork />} />
      <Route path="/artwork/:id" element={<ArtworkDetails />} />
    </Routes>
  </Router>
  );
}

export default App;
