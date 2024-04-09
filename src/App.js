import React from 'react';
import Header from './Components/Partials/Header';
import Footer from './Components/Partials/Footer';
import Home from './Components/Home/Home';
import Movies from './Components/Movies/Movies';
import Movie from './Components/Movie/Movie';
import Category from './Components/Category/Category';
import Search from './Components/Search/Search';
import './index.css';
import {Routes, Route} from "react-router-dom";

function App() {
  return (
    <>
      <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/films" element={<Movies />} />
          <Route path="/film/:filmId" element={<Movie />} />
          <Route path="/categorie/:categoryId" element={<Category />} />
          <Route path="/recherche/:searchValue" element={<Search />} />
        </Routes>

      <Footer />
    </>
  );
}

export default App;
