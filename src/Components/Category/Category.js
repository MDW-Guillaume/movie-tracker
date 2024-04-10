import React, { useEffect, useState } from "react";
import { headers } from '../../config.js';
import { useNavigate, useLocation } from 'react-router-dom';
import background from "../../Images/polygon.png";
import Pagination from '../Pagination/Pagination';
import MoviesList from '../List/MoviesList.js';
import './category.css';

export default function Category() {
    const location = useLocation();
    const navigate = useNavigate();
    const [categorys, setCategorys] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [moviesRequestData, setMoviesRequestData] = useState([]);
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (!location.state) {
            navigate('/');
            return;
        }

        fetch('https://api.themoviedb.org/3/genre/movie/list?language=fr', { headers })
            .then((r) => r.json())
            .then((categoryData) => {
                setCategorys(categoryData.genres);
            })
    }, []);

    useEffect(() => {
        if (categorys.length > 0 && location.state) {
            const selected = categorys.find(category => category.id === parseInt(location.state.categoryId));
            setSelectedCategory(selected);
        }
    }, [categorys])

    useEffect(() => {
        if (selectedCategory && currentPage) {
            if (selectedCategory) {
                fetch(`https://api.themoviedb.org/3/discover/movie?language=fr-FR&page=${currentPage}&sort_by=popularity.desc&with_genres=${selectedCategory.id}`, { headers })
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
                    .catch(error => {
                        console.error('Erreur lors de la récupération des films:', error);
                    });
            }
        }
    }, [currentPage, selectedCategory]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (selectedCategory === undefined) {
        return null;
    } else {
        return (
            <>
                <div className="w-full" style={{ backgroundImage: `url(${background})`, backgroundSize: `cover`, backgroundPosition: `center` }}>
                    <div className="container"><h2 className="text-4xl font-semibold text-white">{selectedCategory.name}</h2></div>
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