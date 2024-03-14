import React from 'react';
import Header from './Components/Partials/Header';
import Footer from './Components/Partials/Footer';
import Home from './Components/Home/Home';
import Movies from './Components/Movies/Movies';
import Movie from './Components/Movie/Movie';
import './index.css';
import {Routes, Route} from "react-router-dom";

function App() {
  return (
    <>
      <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/films" element={<Movies />} />
          <Route path="/film" element={<Movie />} />
        </Routes>

      <Footer />
    </>
  );
}

export default App;
