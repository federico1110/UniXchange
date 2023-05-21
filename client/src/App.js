import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Home} from './pages/home';
import {Auth} from './pages/auth';
import {Vetrina} from './pages/vetrina';
import {AddAnnuncio} from './pages/add-annuncio';
import { Navbar } from './components/navbar';

function App() {
  return (
    <div className="App">
      <Router> 
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/vetrina" element={<Vetrina />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="/addAnnuncio" element={<AddAnnuncio />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
