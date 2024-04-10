import React from 'react';
import { Link } from 'react-router-dom';
import noThumbnail from '../../Images/no-thumbnail.webp';

function MoviesList({ movies }) {
    const image_path = 'https://image.tmdb.org/t/p/original/';

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        const truncatedText = text.slice(0, maxLength);
        const lastSpaceIndex = truncatedText.lastIndexOf(' ');
        return truncatedText.slice(0, lastSpaceIndex) + '...';
    };

    return (
        movies.map((movie, key) => (
            <Link to={`/film/${movie.id}`} state={{ movieId: movie.id }} key={key}>
                <div className="my-3 flex border rounded-lg shadow-lg">
                    <div className="">
                        {(movie.poster_path && 
                        <img src={movie.poster_path ? image_path + movie.poster_path : ''} className="movie_img" alt={movie.title}/>)
                        ||
                        <img src={noThumbnail} className="movie_img" alt={movie.title}/>
                        }
                    </div>
                    <div className="movie-info flex flex-col justify-between my-5 mx-5">
                        <h3 className="font-bold">{movie.title}</h3>
                        <p>{truncateText(movie.overview, 350)}</p>
                    </div>
                </div>
            </Link>
        ))
    )

}
export default MoviesList