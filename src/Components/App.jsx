import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import Catalog from '../Pages/Catalog';
import Home from '../Pages/HomePage';
import Favorites from '../Pages/Favorites';
import NotFoundPage from '../Pages/NotFoundPage';
import css from '../css/App.module.css';

const App = () => {
  return (
    <>
      <div>
        <header>
          <nav>
            <div className={css.navigation}>
              <NavLink to="/" className={css.link}>
                Home
              </NavLink>
              <NavLink to="/catalog" className={css.link}>
                Catalog
              </NavLink>
              <NavLink to="/favorites" className={css.link}>
                Favorites
              </NavLink>
            </div>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="catalog" element={<Catalog />} />
              <Route path="favorites" element={<Favorites />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </>
  );
};

export default App;
