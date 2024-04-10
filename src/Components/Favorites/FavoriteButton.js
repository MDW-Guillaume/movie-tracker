import React, { useEffect, useState } from "react";
import { db } from '../../db';
import { useLiveQuery } from "dexie-react-hooks";


export default function FavoriteButton(data) {

    const [favoriteId, setFavoriteId] = useState(null)
    const favorites = useLiveQuery(() => db.favorites.where({ 'movie_id': data.movieId }).toArray());

    useEffect(() => {
        if (favorites && favorites.length > 0) {
            setFavoriteId(favorites[0].id)
        };
    }, [favorites])



    function addToFavorite() {
        return function () {
            db.favorites.add({ movie_id: data.movieId })
            .then(id => {
                setFavoriteId(id);
            })
            .catch(error => {
                console.error('Erreur lors de l\'ajout de l\'élément:', error);
            });
        }
    }

    function deleteToFavorite() {
        return function () {
            db.favorites.delete(favoriteId)
            .then(() => {
                setFavoriteId(null);
            })
            .catch(error => {
                console.error('Erreur lors de l\'ajout de l\'élément:', error);
            });
        }
    }

    return (
        <>
            {(!favoriteId &&
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="#ff2121"
                    role="button"
                onClick={addToFavorite()}
                >
                    <path d="M19.5 10c-2.483 0-4.5 2.015-4.5 4.5s2.017 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.017-4.5-4.5-4.5zm2.5 5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1zm-6.527 4.593c-1.108 1.086-2.275 2.219-3.473 3.407-6.43-6.381-12-11.147-12-15.808 0-4.005 3.098-6.192 6.281-6.192 2.197 0 4.434 1.042 5.719 3.248 1.279-2.195 3.521-3.238 5.726-3.238 3.177 0 6.274 2.171 6.274 6.182 0 .746-.156 1.496-.423 2.253-.527-.427-1.124-.768-1.769-1.014.122-.425.192-.839.192-1.239 0-2.873-2.216-4.182-4.274-4.182-3.257 0-4.976 3.475-5.726 5.021-.747-1.54-2.484-5.03-5.72-5.031-2.315-.001-4.28 1.516-4.28 4.192 0 3.442 4.742 7.85 10 13l2.109-2.064c.376.557.839 1.048 1.364 1.465z" />
                </svg>)
                ||
                (<svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="#ff2121"
                    role="button"
                onClick={deleteToFavorite()} 
                >
                    <path d="M15.582 19.485c-1.141 1.119-2.345 2.287-3.582 3.515-6.43-6.381-12-11.147-12-15.808 0-4.005 3.098-6.192 6.281-6.192 2.197 0 4.434 1.042 5.719 3.248 1.279-2.195 3.521-3.238 5.726-3.238 3.177 0 6.274 2.171 6.274 6.182 0 1.577-.649 3.168-1.742 4.828l-1.447-1.447c.75-1.211 1.189-2.341 1.189-3.381 0-2.873-2.216-4.182-4.274-4.182-3.257 0-4.976 3.475-5.726 5.021-.747-1.54-2.484-5.03-5.72-5.031-2.315-.001-4.28 1.516-4.28 4.192 0 3.442 4.742 7.85 10 13l2.168-2.121 1.414 1.414zm7.418-5.485h-8v2h8v-2z" />
                </svg>)
            }
        </>
    )
}