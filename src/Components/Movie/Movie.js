import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import './movie.css';

export default function Movie() {
    const location = useLocation();
    const navigate = useNavigate();
    const [movie, setMovie] = useState();
    const [credits, setCredits] = useState([]);
    const [videos, setVideos] = useState([]);
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
                // console.log(movieData);
                setMovie(movieData);
            })

        fetch('https://api.themoviedb.org/3/movie/' + location.state.movieId + '/credits?language=fr-FR', { headers })
            .then((r) => r.json())
            .then((movieCredits) => {
                setCredits(movieCredits.cast);
                // console.log(movieCredits);
            })

        fetch('https://api.themoviedb.org/3/movie/' + location.state.movieId + '/videos?language=fr-FR', { headers })
            .then((r) => r.json())
            .then((movieVideos) => {
                setVideos(movieVideos.results);
                console.log(movieVideos.results);
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
                                    <img src={image_path + movie.poster_path} alt={movie.title} className="movieImg rounded-lg"></img>
                                </div>
                                <div className="w-4/5 ms-5 mt-5 text-white">
                                    <h1 className="text-4xl font-semibold">{movie.title} ({releaseYear})</h1>
                                    <p>{movie.release_date} -
                                        {movie.genres.map((genre, key) => (
                                            <span key={key}> {genre.name} </span> // Futur lien vers la catégorie correspondante
                                        ))}- {duration}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="movieDistribution">
                        <h2 className="text-2xl">Distribution du film</h2>

                        <div className="flex flex-nowrap w-full	overflow-x-scroll pb-2.5">
                            {credits.slice(0, 10).map((actor, key) => (
                                <div className="flex flex-col border rounded-lg actorCard" key={key}>
                                    <a href="#" className="flex items-center rounded-t-lg actorCard_img">
                                        <img src={image_path + actor.profile_path} alt=""></img>
                                    </a>
                                    <div className="px-2.5 pt-2.5">
                                        <a href="#"><h3 className="font-bold">{actor.name}</h3></a>
                                        <span className="text-sm">{actor.character}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <hr className="mt-12" />
                    <div className="movieDistribution mt-12">
                        <div className="flex items-baseline gap-x-2.5">
                            <h2 className="text-2xl mr-5">Médias</h2>
                            <div className="">
                                <h3 className="hover:underline underline-offset-4 decoration-2"><span>Vidéos</span> <span className="bg-slate-300 px-1.5 py-px rounded-lg">{videos.length}</span></h3>
                            </div>
                        </div>
                        <div className="flex flex-nowrap w-full	overflow-x-scroll pb-2.5 gap-x-2.5 mt-2.5">
                            {videos.slice(0, 10).map((video, key) => (
                                <div className="" key={key}>
                                    {video.site == 'YouTube' ? (
                                        <iframe width="560" height="315" src={`https://www.youtube.com/embed/${video.key}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            ))}

                        </div>

                    </div>
                </div>
            </>
        )
    }
}