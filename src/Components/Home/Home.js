import React, { useEffect, useState } from "react";
import background from "../../Images/polygon.png";
import { Link } from "react-router-dom";
import "./home.css";

export default function Home() {
    const [popularMovies, setPopularMovies] = useState([]);
    const image_path = 'https://image.tmdb.org/t/p/original/';
    useEffect(() => {
        const headers = { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDJjN2ZlMTk4OTgzZGE3YjkyMzlmNjYxMjFmYTg5MSIsInN1YiI6IjY1ZjE3MWIzZmJlMzZmMDE0OGVkNDQ2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gXlT-iIuJa9-p8zVqHCwyvAZ5D_z7DBd0F_5VkWLX8Q' };
        fetch('https://api.themoviedb.org/3/trending/movie/week?language=fr-FR', { headers })
            .then((response) => response.json())
            .then((movies) => {
                console.log(movies.results)
                setPopularMovies(movies.results)
            })
    }, [])
    return (
        <>
            <div className="py-20 text-center text-white" style={{ backgroundImage: `url(${background})`, backgroundSize: `cover`, backgroundPosition: `center`, }}>
                <h2 className="text-6xl mb-10">Movie Tracker</h2>
                <span className="text-xl">Les films du moment</span>
            </div>

            <div className="mt-10 mx-10 flex flex-wrap">
                {popularMovies.map((movie, key) => (
                    <Link to="/film" state={{ movieId: movie.id }} key={key} className="movieCard p-2 border" >
                        <img src={image_path + movie.poster_path} className="movieImg border-b pb-3"></img>
                        <div className="inline pt-2">
                            <span>{movie.title}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}