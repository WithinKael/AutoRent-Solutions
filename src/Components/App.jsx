import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import Catalog from '../Pages/Catalog';
import Home from '../Pages/HomePage';
import Favorites from '../Pages/Favorites';
import NotFoundPage from '../Pages/NotFoundPage';

const App = () => {
  return (
    <>
      <div>
        <header>
          <nav>
            <div>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/catalog">Catalog</NavLink>
              <NavLink to="/favorites">Favorites</NavLink>
            </div>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </>
  );
};

export default App;
