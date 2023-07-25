import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MieiAnnunci } from './pages/miei-annunci';
import { Auth } from './pages/auth';
import { Vetrina } from './pages/vetrina';
import { AddAnnuncio } from './pages/add-annuncio';
import { Navbar } from './components/navbar';
import { HomePage } from './pages/home-page';
import {Modifica} from './pages/modifica-annuncio';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/mieiAnnunci" element={<MieiAnnunci />}></Route>
          <Route path="/vetrina" element={<Vetrina />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="/addAnnuncio" element={<AddAnnuncio />}></Route>
          <Route path="/modifica-annuncio" element={<Modifica />}></Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
