import React, { useEffect, useState } from "react";
import { db } from '../../db';
import { useLiveQuery } from "dexie-react-hooks";
import './comments.css'

export default function Comments(data) {
    const [commentValue, setCommentValue] = useState('')
    const [comments, setComments] = useState([])

    // Chargement des commentaires a l'arrivée sur la page

    const commentsDb = useLiveQuery(() => db.comments.where({ 'movie_id': data.movie }).toArray().then(comments => comments.map(comment => comment.content)));

    useEffect(() => {
        // console.log('je passe la', commentsDb)
        if (commentsDb && commentsDb.length > 0) {
            setComments(commentsDb)
        };
    }, [commentsDb])

    // console.log(comments)


    const handleCommentInputChange = (event) => {
        setCommentValue(event.target.value);
    };

    function handleCommentSubmit(event) {
        db.comments.add({ movie_id: data.movie, content: commentValue })
            .then({
                
            })
            .catch(error => {
                console.error('Erreur lors de l\'ajout de l\'élément:', error);
            });
    };

    return (
        <>
            <div className="w-full my-12">
                <h2 className="text-2xl mr-5">Commentaires</h2>
                <h3 className="my-3">Laissez un commentaire</h3>
                <div className="flex flex-col items-end">
                    <textarea
                        className="w-full border-2 p-3"
                        placeholder="Ecrivez votre commentaire ici..."
                        onChange={handleCommentInputChange}>
                    </textarea>
                    <button
                        type="button"
                        className="p-2 border rounded-md border-black shadow-lg float-right mt-2"
                        onClick={handleCommentSubmit}
                    >Soumettre</button>
                </div>
                {((comments && comments.length > 0) &&
                    <div>
                        <h3>Les autres utilisateurs ont dit</h3>
                        <div className="mt-3 flex flex-wrap">
                            {console.log(comments)}
                            {comments.map((comment, key) => (
                                // {console.log(comment)}
                                <div className="commentCard border rounded-lg p-3">
                                    <p>{comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}