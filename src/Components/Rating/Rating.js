import React, { useEffect, useState } from "react";
import { headers } from '../../config.js';

export default function Rating(data) {

    const [personalRating, setPersonalRating] = useState(null);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${data.movie.id}/account_states`, { headers })
            .then((r) => r.json())
            .then((movieState) => {
                if (movieState.rated) {
                    setPersonalRating(movieState.rated.value);
                }
            })
    }, [data.movie.id])

    

    function postRating(index) {
        return function () {
            const newRating = (index + 1) * 2;

            fetch(`https://api.themoviedb.org/3/movie/${data.movie.id}/rating`, {headers, method:'POST', body: JSON.stringify({ "value": newRating })})
            .then(response => response.json())
            .then(response => setPersonalRating(newRating))
            .catch(err => console.error(err));
        }
    }

    function getStarsToDisplay() {
        if (personalRating === null) {
            return 0;
        } else {
            return Math.round(personalRating / 2);
        }
    }

    function removeRating() {
        return function () {
            fetch(`https://api.themoviedb.org/3/movie/${data.movie.id}/rating`, {headers, method:'DELETE'})
            .then(response => response.json())
            .then(response => setPersonalRating(null))
            .catch(err => console.error(err));
        }
    }

    return (
        <>
            {data.movie.vote_average &&
                <div className="mt-5">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">{data.movie.vote_average}</p>
                    </div>
                </div>
            }
            <div className="mt-5">
                <h3>Qu'en avez-vous pensé ?</h3>
                <div className="mt-3 flex items-center">
                    {Array.from({ length: 5 }, (_, index) => (
                        <svg
                            key={index}
                            role='button'
                            className={`w-5 h-5 text-${index < getStarsToDisplay() ? 'yellow' : 'gray'}-300 hover:text-${index < getStarsToDisplay() ? 'gray' : 'yellow'}-300 ms-1`}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                            onClick={postRating(index)}
                        >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                    ))}
                    {personalRating !== null &&
                        <>
                            <span className="ms-5">Vous avez noté ce film {personalRating} / 10</span>
                            <span role="button" className="text-red-300 underline ms-3" onClick={removeRating()}>Retirer</span>
                        </>
                    }
                </div>
            </div>
        </>
    )
}