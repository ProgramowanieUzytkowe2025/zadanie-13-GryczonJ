import './App.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

import TabelaKursowa from './TabelaKursowa';
import CenaZlota from './CenaZlota';
import Autor from './Autor';
import SzczegolyWaluty from './SzczegolyWaluty';


function App() {
  return (
    <Router>
      <div className="App">
        {/* MENU NAWIGACYJNE */}
        <nav className="main-nav">
          <ul>
            <li><NavLink to="/tabela-kursowa">Kursy walut</NavLink></li>
            <li><NavLink to="/cena-zlota">Cena złota</NavLink></li>
            <li><NavLink to="/autor">O autorze</NavLink></li>
          </ul>
        </nav>

        {/* MIEJSCE NA TREŚĆ PODSTRON */}
        <main className="content">
          <Routes>
            {/* Strona główna od razu pokazuje tabelę */}
            <Route path="/" element={<TabelaKursowa />} />
            
            {/* Podstrony główne */}
            <Route path="/tabela-kursowa" element={<TabelaKursowa />} />
            <Route path="/cena-zlota" element={<CenaZlota />} />
            <Route path="/autor" element={<Autor />} />
            
            {/* Dynamiczna podstrona szczegółów waluty */}
            <Route path="/tabela-kursowa/:waluta" element={<SzczegolyWaluty />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;