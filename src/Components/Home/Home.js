import React, { useEffect, useState } from "react";
import { headers } from '../../config.js';
import background from "../../Images/polygon.png";
import { Link } from "react-router-dom";
import FavoriteButton from '../Favorites/FavoriteButton'
import "./home.css";

export default function Home() {
    const [popularMovies, setPopularMovies] = useState([]);
    const image_path = 'https://image.tmdb.org/t/p/original/';
    useEffect(() => {
        fetch('https://api.themoviedb.org/3/trending/movie/week?language=fr-FR', { headers })
            .then((response) => response.json())
            .then((movies) => {
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
                    <div className="relative movieCard ">
                        <Link to={"/film/" + movie.id} state={{ movieId: movie.id }} key={key} className="text-center p-4 border" >
                            <img src={image_path + movie.poster_path} className="movieImg border-b pb-3" alt={movie.title}></img>
                            <div className="inline pt-2">
                                <span>{movie.title}</span>
                            </div>
                        </Link>
                        <div className="absolute right-7 top-5 p-2"><FavoriteButton movieId={movie.id}/></div>
                    </div>
                ))}
            </div>
        </>
    )
}