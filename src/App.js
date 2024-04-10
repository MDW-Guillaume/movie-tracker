import React from 'react';
import Header from './Components/Partials/Header';
import Footer from './Components/Partials/Footer';
import Home from './Components/Home/Home';
import Movie from './Components/Movie/Movie';
import Category from './Components/Category/Category';
import Search from './Components/Search/Search';
import Favorites from './Components/Favorites/Favorites';
import './index.css';
import {Routes, Route} from "react-router-dom";

function App() {
  return (
    <>
      <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/film/:filmId" element={<Movie />} />
          <Route path="/categorie/:categoryId" element={<Category />} />
          <Route path="/recherche/:searchValue" element={<Search />} />
          <Route path="/favoris" element={<Favorites />} />
        </Routes>

      <Footer />
    </>
  );
}

export default App;
