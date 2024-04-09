import React, { useEffect, useState } from "react";
import { headers } from '../../config.js';
import { useNavigate, useLocation } from 'react-router-dom';
import background from "../../Images/polygon.png";
import Pagination from '../Pagination/Pagination';
import MoviesList from '../List/MoviesList.js';

export default function Search() {
    
    const location = useLocation();
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const [movies, setMovies] = useState([]);
    const [moviesRequestData, setMoviesRequestData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (location.state && location.state.searchValue) {
            setSearchValue(location.state.searchValue);
        }
    }, [location.state])

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/search/movie?query=${searchValue}&include_adult=false&language=fr-FR&page=${currentPage}`, { headers })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des films');
            }
            return response.json();
        })
        .then(moviesRequestData => {
            if (moviesRequestData.results.length > 0) {
                setMoviesRequestData(moviesRequestData);
                setMovies(moviesRequestData.results);
            }
        })
    }, [searchValue, currentPage, headers])

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    if (!searchValue) {
        return null;
    } else {
        return (
            <>
                <div className="w-full" style={{ backgroundImage: `url(${background})`, backgroundSize: `cover`, backgroundPosition: `center` }}>
                    <div className="container"><h2 className="text-4xl font-semibold text-white">Recherche pour : {searchValue}</h2></div>
                </div>

                <div className="moviesList container">
                    < MoviesList movies={movies} />
                </div>

                <div className="paginate mb-5">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={moviesRequestData.total_pages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </>
        )
    }
}