import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import './movie.css';

export default function Movie() {
    const location = useLocation();
    const navigate = useNavigate();
    const [movie, setMovie] = useState();
    const image_path = 'https://image.tmdb.org/t/p/original/';

    useEffect(() => {
        if (!location.state) {
            navigate('/');
            return;
        }

        const headers = { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDJjN2ZlMTk4OTgzZGE3YjkyMzlmNjYxMjFmYTg5MSIsInN1YiI6IjY1ZjE3MWIzZmJlMzZmMDE0OGVkNDQ2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gXlT-iIuJa9-p8zVqHCwyvAZ5D_z7DBd0F_5VkWLX8Q' };
        fetch('https://api.themoviedb.org/3/movie/' + location.state.movieId + '?language=fr-FR', { headers })
            .then((r) => r.json())
            .then((movieData) => {
                console.log(movieData);
                setMovie(movieData);
            })
    }, [location.state, navigate]);

    
    if (movie === undefined) {
        return null;
    } else {
        const releaseYear = new Date(movie.release_date).getFullYear();
        const durationHours = Math.floor(movie.runtime / 60);
        const durationMinutes = movie.runtime % 60;

        // Affichage de la durée du film
        const duration = durationHours < 1 ? durationMinutes : durationHours + 'h' + durationMinutes;




        return (
            <>
                <div className="movieBg" style={{ backgroundImage: `url(${image_path + movie.backdrop_path})` }}>
                    <div className="movieBgGradient">
                        <div className="container">
                            <div className="flex">
                                <div className="w-1/5">
                                    <img src={image_path + movie.poster_path} className="movieImg rounded-lg"></img>
                                </div>
                                <div className="w-4/5 ms-5 mt-5 text-white">
                                    <h1 className="text-4xl font-semibold">{movie.title} ({releaseYear})</h1>
                                    <p>{movie.release_date} -
                                        {movie.genres.map((genre, key) => (
                                            <span>{genre.name} </span>
                                            // Futur lien vers la catégorie correspondante
                                        ))}- {duration}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <h2 class="text-3xl">Distribution du film</h2>
                                            
                </div>
            </>
        )
    }
}