import React from "react";
import { Link } from "react-router-dom";

export default function MoviesSearchList(data) {
    const image_path = 'https://image.tmdb.org/t/p/original/';

    if (data.searchResult.length > 0) {
        return (
            <div className="absolute border bg-white w-full">
                {data.searchResult.slice(0, 3).map((movie, key) => (
                    <Link to={"/film/" + movie.id} state={{ movieId: movie.id }} key={key} >
                        <div className="flex p-2 hover:bg-slate-100">
                            <img src={image_path + movie.poster_path} width="80" alt={movie.title}></img>
                            <h3 className="mt-3 ms-3">{movie.title}</h3>
                        </div>
                    </Link>
                ))}
                {data.searchResult.length > 2 && data.searchValue &&
                    <Link to={`/recherche/${data.searchValue}`} state={{ searchValue: data.searchValue }}>
                        <div className="p-2 text-center hover:bg-slate-100">
                            <span>Afficher tout</span>
                        </div>
                    </Link>
                }
            </div>
        )
    } else {
        if (data.searchValue.length > 2) {
            return (
                <div className="absolute border bg-white w-full text-center">
                    <p className="p-3">Aucun résultat trouvé.</p>
                </div>
            )
        }
    }

}