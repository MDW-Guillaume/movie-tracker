import React, {useEffect, useState} from "react";
import background from '../../Images/polygon.png';
import MoviesList from "../List/MoviesList";
import { db } from '../../db';
import { headers } from '../../config';
import { useLiveQuery } from "dexie-react-hooks";

export default function Favorites() {
    const [movies, setMovies] = useState([])
    const favorites = useLiveQuery(() => db.favorites.toArray());

    useEffect(() => {
        if(favorites && favorites.length > 0){
            favorites.map((favorite, key) => {

                fetch(`https://api.themoviedb.org/3/movie/${favorite.movie_id}?language=fr-FR`, { headers })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erreur lors de la récupération des films');
                    }
                    return response.json();
                })
                .then(moviesData => {
                    setMovies(movies => [...movies, moviesData])
                })
            })
        }
    }, [favorites])

    return (
        <>
            <div className="w-full" style={{ backgroundImage: `url(${background})`, backgroundSize: `cover`, backgroundPosition: `center` }}>
                <div className="container"><h2 className="text-4xl font-semibold text-white">Favoris</h2></div>
            </div>

            {(movies.length > 0 &&
            <div className="moviesList container">
                < MoviesList movies={movies} />
            </div>
            ) ||
            <div className="moviesList container">
                <p className="text-center p-5">Vous n'avez aucun film en favoris.</p>
            </div>
            }
            
        </>
    )
}